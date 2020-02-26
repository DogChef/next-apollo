import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  Collapse,
  List,
  ListItemIcon,
  styled as matStyled,
  Typography
} from "@material-ui/core";
import SideBarItem from "./core/SideBarItem";
import SideBarArticle from "./SideBarArticle";
import { ExpandMore as ArrowIcon } from "@material-ui/icons";

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

const SideBarArticles = props => {
  const { loading, error, data } = useQuery(GET_ARTICLES);

  return (
    <>
      {data?.getArticles?.map(
        ({ id, title, parent }, index) =>
          !parent && (
            <SideBarArticle
              addSubArticle={props.addSubArticle}
              hierarchy={1}
              id={id}
              key={index}
              rootPath={
                `${title}-${id}` === props.rootPath[0]
                  ? props.rootPath
                  : undefined
              }
              selected={props.selected}
            />
          )
      )}
    </>
  );
};

export default SideBarArticles;
