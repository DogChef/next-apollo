import React from "react";
import Router from "next/router";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  styled as matStyled,
  TextField
} from "@material-ui/core";

import { CREATE_ARTICLE } from "./core/mutations";

const StyledDialog = matStyled(Dialog)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const StyledTitle = matStyled(DialogTitle)({
  textAlign: "center"
});

const StyledForm = matStyled(Form)({
  width: "100%"
});

const useStyles = makeStyles(theme => ({
  dialogContent: {
    padding: `${theme.spacing(0, 3, 3)} !important`
  },

  button: {
    margin: theme.spacing(3, 0, 2),
    float: "right",
    width: "40%",
    margin: "0px"
  }
}));

const CreateArticleDialog = ({ parentId, open, handleClose }) => {
  const [createArticle, { data }] = useMutation(CREATE_ARTICLE);
  const classes = useStyles();

  const submition = values => {
    createArticle({
      variables: {
        title: values.title,
        parentId: parentId
      }
    })
      .then(
        ({
          data: {
            createdArticle: { id, title }
          }
        }) => {
          if (id) {
            Router.push(`/article/${title}-${id}`);
          }
        }
      )
      .catch(err => {
        //TODO: Add error management
        console.log(`Error Create Article Modal: ${err}`);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledTitle id="form-dialog-title">New Article</StyledTitle>
      <Formik
        initialValues={{ title: "" }}
        onSubmit={submition}
        validateOnBlur={false}
      >
        {({ values: { title }, errors, touched, handleBlur, handleChange }) => (
          <StyledForm noValidate>
            <DialogContent className={classes.dialogContent}>
              <Field
                id="title"
                label="Add a title"
                placeholder="Untitled"
                variant="outlined"
                margin="normal"
                value={title}
                onBlur={handleBlur}
                onChange={handleChange}
                component={TextField}
                autoFocus
                fullWidth
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </DialogContent>
          </StyledForm>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateArticleDialog;
