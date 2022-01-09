/**
 * This index file will export combined reducers.
 */
import { combineReducers } from 'redux';

import fooReducer from './fooReducer';

export default combineReducers({
  foo: fooReducer,
});
