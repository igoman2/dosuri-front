import { Field, Form, Formik } from "formik";
import React, { FC } from "react";

interface MyFormValues {
  firstName: string;
}

interface IInputFormProps {
  placeholder: string;
  type?: string;
}

const InputForm: FC<IInputFormProps> = ({
  placeholder,
  type = "input",
  ...props
}) => {
  const initialValues: MyFormValues = { firstName: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        actions.setSubmitting(false);
      }}
      {...props}
    >
      <Form>
        <Field
          className="field"
          id="nickname"
          name="nickname"
          placeholder={placeholder}
          as={type}
        />
      </Form>
    </Formik>
  );
};

export default InputForm;
