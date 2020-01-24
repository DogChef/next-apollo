import React, { useState, useEffect } from "react";
import { withFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
        <Form>
          {props.fields.map(({ name, placeholder, type }, index) => (
            <React.Fragment key={index}>
              <label htmlFor={name}>{name.capitalize}</label>
              <Field
                name={name}
                placeholder={placeholder}
                type={type}
                innerRef={input => {
                  index === 0 && setFirstInput(input);
                }}
              />
              {errors[name] && touched[name] ? <div>{errors[name]}</div> : null}
              <br />
            </React.Fragment>
          ))}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default BasicForm;
