/**
 * This file houses our foo action creators.
 */
import { toast } from 'react-toastify';

import * as api from '../api';
import {
  CREATE_FOO, FETCH_FOOS, FETCH_FOO, UPDATE_FOO, DELETE_FOO,
} from './types';

/**
 * This action creator will be called to create a foo.
 * @param message message to associate with the foo
 * @returns a thunk responsible for making the request
 */
export const createFoo = (message) => async (dispatch) => {
  try {
    const { data } = await api.createFoo(message);
    dispatch({
      type: CREATE_FOO,
      payload: data,
    });
    toast.success('Foo created!');
  } catch (err) {
    console.error(err);
    toast.error('Foo not created :(');
  }
};

/**
 * This action creator will be called to fetch a list of foos.
 * @returns a thunk responsible for making the request
 */
export const getFoos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchFoos();
    dispatch({
      type: FETCH_FOOS,
      payload: data,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * This action creator will be called to fetch a specific foo.
 * @param id the id of the foo to fetch
 * @returns a thunk responsible for making the request
 */
export const getFoo = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchFoo(id);
    dispatch({
      type: FETCH_FOO,
      payload: data,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * This action creator will be called to update a specific foo.
 * @param id the id of the foo to update
 * @param newFoo the new foo to use for the update
 * @returns a thunk responsible for making the request
 */
export const updateFoo = (id, newFoo) => async (dispatch) => {
  try {
    const { data } = await api.updateFoo(id, newFoo);
    dispatch({
      type: UPDATE_FOO,
      payload: data,
    });
    toast.success('Foo updated!');
  } catch (err) {
    console.error(err);
    toast.error('Foo not updated :(');
  }
};

/**
 * This action creator will be called to delete a specific foo.
 * @param id the id of the foo to delete
 * @returns a thunk responsible for making the request
 */
export const deleteFoo = (id) => async (dispatch) => {
  try {
    await api.deleteFoo(id);
    dispatch({
      type: DELETE_FOO,
      payload: id,
    });
    toast.success('Foo deleted!');
  } catch (err) {
    console.error(err);
    toast.error('Foo not deleted :(');
  }
};
