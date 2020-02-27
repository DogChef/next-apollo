import React from "react";
import Head from "next/head";
import Header from "./Header";
import ArtMod from "../CreateArticleModal";
import SideBar, { drawerWidth } from "./SideBar";
import { logout } from "../../lib/useAuth";
import styled from "styled-components";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import { AppBar, Button, Box, Toolbar, Typography } from "@material-ui/core";

import {
  SupervisedUserCircle as UserIcon,
  ChromeReaderMode as ViewIcon,
  Create as CreateIcon,
  PermIdentity as ProfileIcon
} from "@material-ui/icons";

const Layout = props => {
  const theme = useTheme();
  const [rootPath, setRootPath] = React.useState([]);
  const [isModalOpen, openModal] = React.useState(false);
  const [articleId, setArticleId] = React.useState(null);
  const [selected, setSelected] = React.useState(props.selected);

  const FlexBox = matStyled(Box)({
    display: "flex",
    flexGrow: 1
  });

  const StyledMain = styled.main`
    flex-grow: 1;
    background-color: ${theme.palette.background.default};
    padding: ${theme.spacing(3)}px;
    margin-top: ${theme.spacing(8)}px;
    min-height: calc(100vh - 64px);
    ${props.mainStyles}
  `;

  const addSubArticle = id => {
    setArticleId(id);
    openModal(true);
  };

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <FlexBox>
        <Header logout={logout} drawerWidth={drawerWidth} />

        <SideBar
          selected={selected}
          setSelected={setSelected}
          rootPath={rootPath}
          addSubArticle={addSubArticle}
          openModal={openModal}
        />

        <StyledMain>
          {React.cloneElement(props.children, { setRootPath: setRootPath })}
        </StyledMain>
        <ArtMod
          open={isModalOpen}
          parentId={articleId}
          handleClose={() => openModal(false)}
        />
      </FlexBox>
    </>
  );
};

export default Layout;
