import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, styled as matStyled } from "@material-ui/core";
import moment from "moment";
import {
  Count,
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar
} from "@syncfusion/ej2-react-richtexteditor";

import { enableRipple } from "@syncfusion/ej2-base";
enableRipple(true);

import { UPDATE_ARTICLE } from "./core/mutations";

const useStyles = makeStyles(theme => ({
  editor: {
    "&.e-control .e-rte-content": {
      backgroundColor: theme.palette.background.default,
      width: "70vw !important",
      minHeight: "72vh !important",
      margin: "auto !important"
    },

    "&.e-control .e-content": {
      fontSize: "18pt !important",
      padding: 0
    },

    "&.e-control .e-dlg-header": {
      float: "right"
    }
  }
}));

const StyledTypography = matStyled(Typography)({
  flexGrow: 1,
  flexBasis: "100%"
});

const StyledGrid = matStyled(Grid)({
  alignSelf: "flex-end"
});

const ArticleEditor = ({ status, article, isFake = false }) => {
  const [lastTimeSaved, savedAt] = useState("");
  const [writeArticle, { data }] = useMutation(UPDATE_ARTICLE);
  const classes = useStyles();

  const author = article && `Created by: ${article.author.name}`;

  !!article &&
    lastTimeSaved == "" &&
    savedAt(`Last update: ${moment(article.updatedAt).format("LLL")}`);

  const onSave = newBody => {
    if (isFake) {
      savedAt(`Saved at: ${moment().format("LLL")}`);
      return;
    }
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
            updatedArticle: { updatedAt }
          }
        }) => {
          savedAt(`Saved at: ${moment(updatedAt).format("LLL")}`);
        }
      )
      .catch(err => {
        console.log(`Article Editor Mutation Error: ${err}`);
      });
  };

  return (
    <>
      {article && (
        <StyledTypography variant="h3">{article.title}</StyledTypography>
      )}
      {status ? (
        <StyledTypography variant="h4">{status}</StyledTypography>
      ) : (
        <RichTextEditorComponent
          id="inlineRTE"
          change={valueTemplate => onSave(valueTemplate.value)}
          className={classes.editor}
          enableResize={false}
          enableTabKey={true}
          inlineMode={{ enable: true, onSelection: true }}
          locale={"es-AR"}
          readonly={status !== undefined}
          saveInterval={300 /*miliseconds*/}
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
          valueTemplate={article.body}
        >
          <Inject
            services={[Image, Link, QuickToolbar, HtmlEditor, Toolbar, Count]}
          />
        </RichTextEditorComponent>
      )}
      <StyledGrid container>
        <Grid item xs={6}>
          <Typography variant="h5">{author}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{lastTimeSaved}</Typography>
        </Grid>
      </StyledGrid>
    </>
  );
};

export default ArticleEditor;
