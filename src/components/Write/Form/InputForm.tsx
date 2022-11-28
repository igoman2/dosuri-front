import React from "react";
import { Formik, Form, Field } from "formik";

interface MyFormValues {
  firstName: string;
}

const InputForm = () => {
  const initialValues: MyFormValues = { firstName: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <Field
          className="field"
          id="nickname"
          name="nickname"
          placeholder="궁금한거나 공유하고 싶은 내용을 다른 회원들에게 공유해주세요."
        />
      </Form>
    </Formik>
  );
};

export default InputForm;
