import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);

  const renderContent = () => {
    if (showFormReview) {
      return <SurveyFormReview onCancel={() => setShowFormReview(false)} />;
    }

    return <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />;
  };

  return (
    <div className="container">
      <h1>Create a Survey</h1>
      {renderContent()}
    </div>
  );
};

// this is sort of a trick with Redux Form to get it to clear out the surveyForm values
// when the SurveyNew component unmounts. In the child SurveyForm component, we set destroyOnUnmount to false
// so that doesn't clear out when unmounted, but this one we allow the default behavior
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
