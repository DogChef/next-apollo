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
import {
  ExpandMore as ArrowIcon,
  InsertDriveFileOutlined
} from "@material-ui/icons";

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

export const ArticleIcon = matStyled(InsertDriveFileOutlined)({
  fontSize: "1.2rem",
  marginRight: "4px",
  marginBottom: "1px"
});

const SideBarArticles = props => {
  const { loading, error, data } = useQuery(GET_ARTICLES);

  return (
    <>
      {data?.getArticles?.map(
        ({ id, title, parent }, index) =>
          !parent && (
            <SideBarArticle
              addSubArticle={props.addSubArticle}
              selected={props.selected}
              id={id}
              key={index}
              hierarchy={0}
            />
          )
      )}
    </>
  );
};

export default SideBarArticles;
