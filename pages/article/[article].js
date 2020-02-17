import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import Layout from "../../components/core/Layout";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import {
  styled as matStyled,
  useTheme,
  makeStyles
} from "@material-ui/core/styles";
import {
  Grid,
  Typography,
} from "@material-ui/core";
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
import withAuth from "../../lib/withAuth";

import { enableRipple } from "@syncfusion/ej2-base";
enableRipple(true);

const GET_ARTICLE = gql`
  query getArticle($id: ID!) {
    getArticle(id: $id) {
      id
      title
      body
      author {
        id
        name
      }
    }
  }
`;

const WRITE_ARTICLE = gql`
  mutation writeArticle($id: ID, $title: String!, $body: String) {
    updateArticle(articleInput: { id: $id, title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

const mainStyles = `
  text-align: center;
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
    }
  }
}));

const currentDate = () => {
  const today = new Date();
  const hours = today.getHours();
  var seconds = today.getSeconds();
  return `${hours}:${today.getMinutes()}:${seconds < 10 ? `0${seconds}` : seconds}${hours > 12 ? 'pm' : 'am'} - ${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}`;    
}

const Article = () => {
  const { article } = useRouter().query;

  const idRegEx = /(.*)\-(\d+)$/;
  const [string, title, id] = idRegEx.exec(article);

  const classes = useStyles();
  const textEditor = useRef(null);
  const [articleBody, setBody] = useState("");
  const [lastTimeSaved, savedAt] = useState(`Loaded at: ${currentDate()}`);
  const [writeArticle, { data }] = useMutation(WRITE_ARTICLE);

  const queryData = useQuery(GET_ARTICLE, {
    variables: { id }
  });

  if (queryData.loading) return "Loading...";
  if (queryData.error) return `Error! ${error.message}`;
  
  articleBody !== queryData.data.getArticle.body && setBody(queryData.data?.getArticle.body);

  /*if (textEditor) {
    textEditor?.contentModule?.getDocument().addEventListener("keydown", (e) => {
      if (e.key === 's' && e.ctrlKey === true) {
          e.preventDefault(); // to prevent default ctrl+s action
          //instance.updateValue(); // to update the value after editing
          // const value: any= instance.value; // you can get the RTE content to save in the desired database
      }
    });
  }*/

  const onSave = () => {
    const newBody = textEditor.current.value;
    writeArticle({
      variables: {
        id: id,
        title: title,
        body: newBody
      }
    })
      .then(
        ({
          data: {
            updateArticle: { title, body }
          }
        }) => {
          console.log('Mutacion realizada');
          savedAt(`Saved at: ${currentDate()}`);
        }
      )
      .catch(err => {
        console.log(`todo mal la mutation ${err}`)
      });
    
  }

  return (
    <Layout title="View Article" selected={string} mainStyles={mainStyles}>
      <RichTextEditorComponent
        id="inlineRTE"
        change={() => onSave()}
        className={classes.editor}
        enableResize={false}
        enableTabKey={true}
        inlineMode={{ enable: true, onSelection: true }}
        locale={'es-AR'}
        saveInterval={1000 /*miliseconds*/}
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
        ref={textEditor}
        value={articleBody}
      >
        <Inject
          services={[Image, Link, QuickToolbar, HtmlEditor, Toolbar, Count]}
        />
      </RichTextEditorComponent>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5">
            Created by: {queryData?.data.getArticle.author.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            {lastTimeSaved}
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default withAuth({})(Article);
