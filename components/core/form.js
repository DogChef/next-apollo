import React, { useState, useEffect } from "react";
import { withFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const StyledForm = styled(Form)`
  width: 100%;
`;

const BasicForm = props => {
  const [firstInput, setFirstInput] = useState(null);

  useEffect(() => {
    firstInput?.focus();
  });

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.onSubmit}
      validateOnBlur={false}
    >
      {({ values, errors, touched }) => (
        <StyledForm>
          {props.fields.map(({ name, placeholder, type, component }, index) => (
            <React.Fragment key={index}>
              <label htmlFor={name}>{name.capitalize}</label>
              <Field
                name={name}
                placeholder={placeholder}
                type={type}
                component={component}
                innerRef={input => {
                  index === 0 && setFirstInput(input);
                }}
              />
              {errors[name] && touched[name] ? <div>{errors[name]}</div> : null}
              <br />
            </React.Fragment>
          ))}
          <button type="submit">Submit</button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default BasicForm;
