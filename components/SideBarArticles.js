import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Divider, styled as matStyled } from "@material-ui/core";
import { ExpandMore as ArrowIcon } from "@material-ui/icons";

import SideBarArticle from "./SideBarArticle";

const GET_ARTICLES = gql`
  {
    getArticles {
      id
      title
      parent {
        id
      }
    }
  }
`;

const GET_FAVOURITE_ARTICLES = gql`
  {
    verifyUser {
      id
      favourites {
        id
        title
        parent {
          id
        }
      }
    }
  }
`;

const SideBarArticles = ({ isMain, addSubArticle, rootPath, selected }) => {
  const { loading, error, data } = useQuery(
    isMain ? GET_ARTICLES : GET_FAVOURITE_ARTICLES
  );

  const articles = isMain ? data?.getArticles : data?.verifyUser?.favourites;

  return (
    <>
      {articles?.map(
        ({ id, title, parent }, index) =>
          (!parent || !isMain) && (
            <div key={index}>
              <SideBarArticle
                addSubArticle={addSubArticle}
                hierarchy={1}
                id={id}
                rootPath={
                  `${title}-${id}` === rootPath[0] ? rootPath : undefined
                }
                selected={selected}
              />
              {!isMain && <Divider />}
            </div>
          )
      )}
    </>
  );
};

export default SideBarArticles;
