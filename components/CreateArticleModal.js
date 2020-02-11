import React from "react";
import Router from "next/router";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  styled as matStyled,
  TextField,
  Typography,
  useTheme
} from "@material-ui/core";

const CREATE_ARTICLE = gql`
  mutation createArticle($title: String!) {
    createArticle(articleInput: { title: $title }) {
      id
    }
  }
`;

const CreateArticleModal = props => {
  const theme = useTheme();
  const [createArticle, { data }] = useMutation(CREATE_ARTICLE);

  const StyledModal = matStyled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });

  const ModalContent = matStyled(Box)({
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  });

  const StyledButton = matStyled(Button)({
    margin: theme.spacing(3, 0, 2),
    float: "right",
    width: "40%",
    margin: "0px"
  });

  const StyledForm = matStyled(Form)({
    width: "100%"
  });

  const StyledTypography = matStyled(Typography)({
    textAlign: "center"
  });

  const submition = (values, { setSubmitting, setErrors }) => {
    createArticle({
      variables: {
        title: values.title
      }
    })
      .then(
        ({
          data: {
            createArticle: { id }
          }
        }) => {
          if (id) {
            Router.push(`/${id}`);
          }
        }
      )
      .catch(err => {
        //TODO: Add error management
        console.log("Error art");
      });
  };

  return (
    <StyledModal
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.open}>
        <ModalContent>
          <StyledTypography variant="h5">New article</StyledTypography>
          <Formik
            initialValues={{ title: "" }}
            onSubmit={submition}
            validateOnBlur={false}
          >
            {({
              values: { title },
              errors,
              touched,
              handleBlur,
              handleChange
            }) => (
              <StyledForm noValidate>
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
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </StyledButton>
              </StyledForm>
            )}
          </Formik>
        </ModalContent>
      </Fade>
    </StyledModal>
  );
};

export default CreateArticleModal;
