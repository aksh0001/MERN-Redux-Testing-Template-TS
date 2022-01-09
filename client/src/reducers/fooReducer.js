/**
 * This file exports our foo reducer that will handle all dispatched foo-related actions.
 */
import {
  CREATE_FOO, FETCH_FOOS, FETCH_FOO, UPDATE_FOO, DELETE_FOO,
} from '../actions/types';

const INITIAL_FOO_STATE = [];

/**
 * This fooReducer will handle all foo-related actions.
 *
 * @param state the state initialized to an empty array.
 * @param action the action that was dispatched, and now input into this reducer.
 * @returns updated state.
 */
const fooReducer = (state = INITIAL_FOO_STATE, action) => {
  switch (action.type) {
    case CREATE_FOO:
      return [...state, action.payload];
    case FETCH_FOOS:
      return [...state, ...action.payload];
    case FETCH_FOO:
      return [...state, action.payload];
    case UPDATE_FOO:
      return state.map((foo) => (foo._id === action.payload._id ? action.payload : foo));
    case DELETE_FOO:
      return state.filter((foo) => foo._id !== action.payload);
    default:
      return state;
  }
};

export default fooReducer;
