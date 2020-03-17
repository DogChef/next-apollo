import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import { Divider, List, ListItemIcon, Typography } from "@material-ui/core";
import { PermIdentity as ProfileIcon } from "@material-ui/icons";
import moment from "moment";

import ArticleModification from "./ArticleModification";
import { GET_MODIFICATIONS } from "./core/article_modifications";

const drawerWidth = 340;

const ArticleModifications = ({ id }) => {
  const { data } = useQuery(GET_MODIFICATIONS, {
    fetchPolicy: "no-cache",
    variables: { id: id }
  });

  const StyledList = matStyled(List)({
    width: drawerWidth
  });

  const StyledTypography = matStyled(Typography)({
    textAlign: "center",
    padding: "20px 0"
  });

  const modificationList = data?.getArticleModifications?.reverse();

  return (
    <StyledList>
      {modificationList?.map(
        ({ user, title, body, author, updatedAt }, index) => (
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
        )
      )}
      {!modificationList?.length && (
        <StyledTypography>
          There are no modifications for this article
        </StyledTypography>
      )}
    </StyledList>
  );
};

export default ArticleModifications;
