import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  const renderedFields = formFields.map(field => {
    return (
      <Field
        key={field.name}
        component={SurveyField}
        type="text"
        name={field.name}
        placeholder={field.placeholder}
        labelText={field.labelText}
      />
    );
  });

  return (
    <div>
      {/* 
        handleSubmit is added to props automatically by redux form 
        it creates a state property for each field, where the key is the "name" attribute,
        and the value is the value of that field, and it accepts a callback arg to run 
        after a successful form submission. In this case we're passing it onSurveySubmit, 
        which sets a state property in the SurveyNew component
      */}
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {renderedFields}
        <Link to="/surveys" className="red btn-flat left white-text">
          Cancel
          <i className="material-icons right">cancel</i>
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

// values arg is passed by Redux Form
const validate = values => {
  const errors = {};

  // Redux Form will pass any error messages to the field that matches the name attribute
  // iterate through fields and match up the errors with the names
  formFields.forEach(({ name, messages: { required, valid } }) => {
    // NOTE: the course has the email validator outside of this loop, but I
    // wanted access to the custom error messages I created. Put valid first so
    // if empty that will override the valid one
    if (name === 'recipients') {
      const invalidEmails = validateEmails(values.recipients);

      if (invalidEmails) {
        errors.recipients = `${valid} ${invalidEmails}`;
      }
    }

    if (!values[name]) {
      errors[name] = required;
    }
  });

  // must return an object to tell Redux Form if the form is valid
  // an empy object means the form is valid
  return errors;
};

// validate state is provided by Redux Form to pass it a validation function
// "form" is the namespace for this specific form. So in state it will be form.surveyForm
// destroyOnUnmout (true by default) clears all the values when the form component
// unmounts. Here we want to keep them for the review step
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
