/**
 * This file uses the custom axios client and defines the possible requests that can be made.
 */
import fooApi from './api';

// Foos
export const createFoo = (message) => fooApi.post('/foo', message);
export const fetchFoos = () => fooApi.get('/foo');
export const fetchFoo = (id) => fooApi.get(`/foo/${id}`);
export const updateFoo = (id, newFoo) => fooApi.put(`/foo/${id}`, newFoo);
export const deleteFoo = (id) => fooApi.delete(`/foo/${id}`);
