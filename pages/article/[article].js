import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import Layout from "../../components/core/Layout";
import { useRouter } from "next/router";
import {
  styled as matStyled,
  useTheme,
  makeStyles
} from "@material-ui/core/styles";
import {
  RichTextEditorComponent,
  Inject,
  Count,
  QuickToolbar,
  Image,
  Link,
  HtmlEditor,
  Toolbar,
  ToolbarType
} from "@syncfusion/ej2-react-richtexteditor";

import { enableRipple } from "@syncfusion/ej2-base";
enableRipple(true);

const mainStyles = `
  text-align: center;
`;

const useStyles = makeStyles(theme => ({
  editor: {
    "&.e-control .e-rte-content": {
      backgroundColor: theme.palette.background.default,
      minWidth: "60vw !important",
      minHeight: "74vh !important",
      margin: "auto !important"
    },

    "&.e-control .e-content": {
      fontSize: "18pt !important"
    }
  }
}));

const Article = () => {
  const { article } = useRouter().query;

  const idRegEx = /(.*)\-(\d+)$/;
  const [string, title, id] = idRegEx.exec(article);

  const classes = useStyles();
  var rteObj = undefined;

  return (
    <Layout title="View Article" selected={string} mainStyles={mainStyles}>
      <h1>Title: {title}</h1>
      <h1>Article id: {id}</h1>
      <RichTextEditorComponent
        id="inlineRTE"
        className={classes.editor}
        enableResize={false}
        enableTabKey={true}
        inlineMode={{ enable: true, onSelection: true }}
        showCharCount={true}
        toolbarSettings={{
          enable: true,

          items: [
            "Formats",
            "Alignments",
            "OrderedList",
            "UnorderedList",
            "|",
            "FontName",
            "FontColor",
            "FontSize",
            "BackgroundColor",
            "-",
            "Bold",
            "Italic",
            "Underline",
            "StrikeThrough",
            "|",
            "CreateLink",
            "Image",
            "|",
            "SubScript",
            "SuperScript",
            "|",
            "Print",
            "SourceCode"
          ]
        }}
        value={"Contenidououououo"}
      >
        <Inject
          services={[Image, Link, QuickToolbar, HtmlEditor, Toolbar, Count]}
        />
      </RichTextEditorComponent>
    </Layout>
  );
};

export default Article;
