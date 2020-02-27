import React from "react";
import ArticleModification from "./ArticleModification";
import SideBarItem from "./core/SideBarItem";
import SideBarArticles from "./SideBarArticles";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import moment from "moment";

import {
  SupervisedUserCircle as UserIcon,
  ChromeReaderMode as ViewIcon,
  Create as CreateIcon,
  PermIdentity as ProfileIcon
} from "@material-ui/icons";

export const drawerWidth = 340;

const GET_MODIFICATIONS = gql`
  query getArticleModifications($id: ID!) {
    getArticleModifications(id: $id) {
      id
      user {
        id
        name
      }
      title
      body
      author {
        id
        name
      }
      updatedAt
    }
  }
`;

const ArticleModifications = ({ id }) => {
  const { data } = useQuery(GET_MODIFICATIONS, {
    variables: { id: id }
  });

  const StyledList = matStyled(List)({
    width: drawerWidth
  });

  const StyledTypography = matStyled(Typography)({
    textAlign: "center",
    padding: "20px 0"
  });

  return (
    <StyledList>
      {data?.getArticleModifications
        ?.reverse()
        .map(({ user, title, body, author, updatedAt }, index) => (
          <div key={index}>
            {index !== 0 && <Divider />}
            <ArticleModification
              authorTime={`By ${user.name} ${moment(updatedAt).fromNow()}`}
              title={title}
              body={body}
              author={author}
            >
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
            </ArticleModification>
          </div>
        ))}
      {data?.getArticleModifications.length === 0 && (
        <StyledTypography>
          There are no modifications for this article
        </StyledTypography>
      )}
    </StyledList>
  );
};

export default ArticleModifications;
