import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import { submitSurvey } from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const renderedFields = formFields.map(({ name, labelText }) => {
    return (
      <div key={name} style={{ marginBottom: '20px' }}>
        <label>{labelText}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h4>Please confirm your entries.</h4>
      {renderedFields}
      <button
        onClick={onCancel}
        className="yellow darken-3 btn-flat white-text">
        Back
        <i className="material-icons left">arrow_back</i>
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    formValues: state.form.surveyForm.values
  };
};

// withRouter is provided by react-router-dom to pass the router history
// object into props. This allows us to pass "history" to our action creator
// after submitting the form so we can do a redirect
export default connect(mapStateToProps, { submitSurvey })(
  withRouter(SurveyFormReview)
);
