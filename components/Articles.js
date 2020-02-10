import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

const GET_ARTICLES = gql`
  {
    getArticles {
      id
      title
    }
  }
`;

const Articles = () => {
  const { loading, error, data } = useQuery(GET_ARTICLES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Typography variant="h4">
        There are currently {data.getArticles.length} articles registered in the
        system.
      </Typography>

      {data.getArticles.length > 0 && (
        <Typography variant="h5">They are:</Typography>
      )}
      {data.getArticles.map(({ id, title }, index) => (
        <ul key={index}>
          <li>id: {id} </li>
          <li>title: {title} </li>
        </ul>
      ))}
    </>
  );
};

export default Articles;