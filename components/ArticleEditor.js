import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, styled as matStyled } from "@material-ui/core";
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

const WRITE_ARTICLE = gql`
  mutation writeArticle($id: ID, $title: String, $body: String) {
    updateArticle(articleInput: { id: $id, title: $title, body: $body }) {
      updatedAt
    }
  }
`;

const useStyles = makeStyles(theme => ({
  editor: {
    "&.e-control .e-rte-content": {
      backgroundColor: theme.palette.background.default,
      width: "70vw !important",
      minHeight: "74vh !important",
      margin: "auto !important"
    },

    "&.e-control .e-content": {
      fontSize: "18pt !important"
    },

    "&.e-control .e-dlg-header": {
      float: "right"
    }
  }
}));

const formatDate = date => {
  const hours = date.getHours();
  const seconds = date.getSeconds();
  return `${hours}:${date.getMinutes()}:${
    seconds < 10 ? `0${seconds}` : seconds
  }${hours > 12 ? "pm" : "am"} - ${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()}`;
};

const ArticleEditor = ({ status, article }) => {
  const classes = useStyles();

  const initialState =
    article && `Last update: ${formatDate(new Date(article?.updatedAt))}`;
  const author = article && `Created by: ${article.author.name}`;

  const [lastTimeSaved, savedAt] = useState(initialState);
  const [writeArticle, { data }] = useMutation(WRITE_ARTICLE);
  const [loaded, didLoad] = useState(false);
  const onSave = newBody => {
    writeArticle({
      variables: {
        id: article.id,
        title: article.title,
        body: newBody
      }
    })
      .then(
        ({
          data: {
            updateArticle: { updatedAt }
          }
        }) => {
          savedAt(`Last saved at: ${formatDate(new Date(updatedAt))}`);
        }
      )
      .catch(err => {
        console.log(`todo mal la mutation ${err}`);
      });
  };

  const editorLoaded = () => {
    setTimeout(() => {
      didLoad(article !== undefined);
    }, 1);
  };

  return (
    <>
      {article && <Typography variant="h3">{article.title}</Typography>}
      <RichTextEditorComponent
        id="inlineRTE"
        change={valueTemplate => onSave(valueTemplate.value)}
        className={classes.editor}
        created={editorLoaded()}
        enableResize={false}
        enableTabKey={true}
        inlineMode={{ enable: true, onSelection: true }}
        locale={"es-AR"}
        readonly={status !== undefined}
        saveInterval={5000 /*miliseconds*/}
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
        valueTemplate={status || article.body}
      >
        <Inject
          services={[Image, Link, QuickToolbar, HtmlEditor, Toolbar, Count]}
        />
      </RichTextEditorComponent>
      {loaded && (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5">{author}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">{lastTimeSaved}</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ArticleEditor;
