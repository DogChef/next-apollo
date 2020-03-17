import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Box, styled as matStyled, useTheme } from "@material-ui/core";

import Header from "./Header";
import SideBar from "./SideBar";
import ArtMod from "../CreateArticleModal";

const FlexBox = matStyled(Box)({
  display: "flex",
  flexGrow: 1
});

const Layout = ({ selected, mainStyles, title, children }) => {
  const theme = useTheme();
  const [rootPath, setRootPath] = React.useState([]);
  const [isModalOpen, openModal] = React.useState(false);
  const [current, setSelected] = React.useState(selected);
  const [newParentId, setNewParentId] = React.useState(null);

  const styledMain = {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
    minHeight: "calc(100vh - 64px)",
    ...mainStyles
  };

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

        <main style={styledMain}>
          {React.cloneElement(children, { setRootPath: setRootPath })}
        </main>
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
