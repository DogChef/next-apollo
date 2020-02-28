import React from "react";
import Layout from "../components/core/Layout";
import withAuth from "../lib/withAuth";
import { Breadcrumbs, Typography } from "@material-ui/core";
import ArticleEditor from "../components/ArticleEditor";

const articleBody = `
  <h4><span style="text-decoration: underline;">
    <a class="e-rte-anchor" href="http://localhost:3000/welcome" title="Welcome article" target="_blank">
      This is an example of an article. <strong>🤓</span></strong>
    </a>
  </h4>
  <p>Feel free to play around with the editor, you'll find multiple functions to keep your articles as <em>customized</em> as <strong>you</strong> want to</p>
  <br>
  <p style="text-align: left;">
    At the top left you can see Breadcumbs 🥐,
  </p>
  <p style="text-align: left;">
    They'll help you navigate through the article hierarchy
  </p>
  <br>
  <p style="text-align: left;">
    On the left you'll find the navbar
  </p>
  <p style="text-align: left;">
    Use it to navigate through the app.
  </p>
  <br>
  <p style="text-align: right;">
    At the top right of any articles you'll find the view history button
  </p>
  <p style="text-align: right;">
    <span style="text-decoration: line-through;">Since this is an example we wont keep track of modifications! 🙈</span>
  </p>
`;

const fakeArticle = {
  id: 0,
  title: "Welcome to Lotion!",
  body: articleBody,
  updatedAt: Date.now(),
  author: {
    name: "Lithium"
  }
};

const mainStyles = `
  text-align: center;
  display: flex;
  flex-wrap: wrap;
`;

const Welcome = () => (
  <>
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Typography color="textPrimary">Welcome</Typography>
    </Breadcrumbs>
    <ArticleEditor status={undefined} article={fakeArticle} isFake={true} />;
  </>
);

Welcome.getLayout = page => (
  <Layout title="Welcome" mainStyles={mainStyles} selected="welcome">
    {page}
  </Layout>
);

export default withAuth({})(Welcome);
