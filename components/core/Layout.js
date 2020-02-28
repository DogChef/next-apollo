import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Box, styled as matStyled, useTheme } from "@material-ui/core";

import Header from "./Header";
import SideBar from "./SideBar";
import ArtMod from "../CreateArticleModal";

const Layout = ({ selected, mainStyles, title, children }) => {
  const theme = useTheme();
  const [rootPath, setRootPath] = React.useState([]);
  const [isModalOpen, openModal] = React.useState(false);
  const [current, setSelected] = React.useState(selected);
  const [newParentId, setNewParentId] = React.useState(null);

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
    ${mainStyles}
  `;

  const addSubArticle = id => {
    setNewParentId(id);
    openModal(true);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <FlexBox>
        <Header />

        <SideBar
          selected={current}
          setSelected={setSelected}
          rootPath={rootPath}
          addSubArticle={addSubArticle}
          openModal={openModal}
        />

        <StyledMain>
          {React.cloneElement(children, { setRootPath: setRootPath })}
        </StyledMain>
        <ArtMod
          open={isModalOpen}
          parentId={newParentId}
          handleClose={() => openModal(false)}
        />
      </FlexBox>
    </>
  );
};

export default Layout;
