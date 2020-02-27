import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { List, Typography } from "@material-ui/core";

const GET_ARTICLES = gql`
  {
    getArticles {
      id
      title
      body
      parent {
        id
        title
      }
      children {
        id
        title
      }
      author {
        id
        name
      }
    }
  }
`;

const Articles = () => {
  const { loading, error, data } = useQuery(GET_ARTICLES);
  const util = require("util");

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
      {data.getArticles.map(
        ({ id, title, body, parent, children, author }, index) => (
          <ul key={index}>
            <li>id: {id} </li>
            <li>title: {title} </li>
            <li dangerouslySetInnerHTML={{ __html: `Body: ${body}` }} />
            <li>parent: {util.inspect(parent)}</li>
            <li>children: {util.inspect(children)} </li>
            <li>
              author: {author.id} {author.name}{" "}
            </li>
          </ul>
        )
      )}
    </>
  );
};

export default Articles;
