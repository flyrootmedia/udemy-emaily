import React from 'react';

// props.input comes from Redux Form
// nested destructuring for meta object
export default ({
  input,
  placeholder,
  type,
  labelText,
  meta: { error, touched }
}) => {
  return (
    <div className="field-container">
      <label>{labelText}</label>
      {/* 
        we can spread all the props on the input prop sent by redux form 
        to get all of its event handlers. Note that the course only says
        to destructure the "input" prop, but "type" and "placeholder" appear 
        to be siblings of "input"
      */}
      <input
        type={type}
        {...input}
        placeholder={placeholder}
        style={{ marginBottom: '5px' }}
      />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
