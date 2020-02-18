import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import SideBarItem from "./core/SideBarItem";
import { InsertDriveFileOutlined as ArticleIcon } from "@material-ui/icons";

const GET_CURRENT_USER_ARTICLES = gql`
  {
    verifyUser {
      id
      articles {
        id
        title
      }
    }
  }
`;

const MyArticles = props => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER_ARTICLES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.verifyUser?.articles?.map(({ id, title }, index) => {
        const titleId = `${title}-${id}`;

        return (
          <SideBarItem
            url={`/article/${titleId}`}
            text={title}
            selected={titleId === props.selected}
            key={index}
          >
            <ArticleIcon />
          </SideBarItem>
        );
      })}
    </>
  );
};

export default MyArticles;
