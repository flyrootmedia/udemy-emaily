import { combineReducers } from 'redux';

import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

// note you must assign redux form to the key "form" because that's what redux-form expects the state
// property to be named. (check the docs for custom name if there's a clash)

export default combineReducers({
  form: reduxFormReducer,
  auth: authReducer,
  surveys: surveysReducer
});
