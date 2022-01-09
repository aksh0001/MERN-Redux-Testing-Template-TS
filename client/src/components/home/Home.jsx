/**
 * This file exports a home component that displays the main screen/homepage.
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CRUDTable, {
  CreateForm, DeleteForm, Field, Fields, UpdateForm,
} from 'react-crud-table';

import {
  createFoo, getFoos, updateFoo, deleteFoo,
} from '../../actions/foo';

import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const foos = useSelector((state) => state.foo);

  const foosToRender = foos.map((foo) => ({
    id: foo._id,
    message: foo.message,
  }));

  useEffect(() => {
    dispatch(getFoos());
  }, []);

  return (
    <div style={{
      margin: 'auto',
      width: 'fit-content',
    }}
    >
      <h3>
        Total of
        {' '}
        {foos.length}
        {' '}
        foos exist!
      </h3>
      <CRUDTable
        caption="Foos"
        items={foosToRender}
      >
        <Fields>
          <Field
            name="id"
            label="Id"
            hideInCreateForm
            readOnly
          />
          <Field
            name="message"
            label="Message"
            placeholder="Message"
          />
        </Fields>
        <CreateForm
          title="Foo Creation"
          message="Create a new foo!"
          trigger="Create Foo"
          onSubmit={(foo) => Promise.resolve(dispatch(createFoo(foo)))}
          submitText="Create"
          validate={(values) => {
            const errors = {};
            if (!values.message) {
              errors.message = 'Please, provide foo\'s message';
            }
            return errors;
          }}
        />
        <UpdateForm
          title="Foo Update Process"
          message="Update foo"
          trigger="Update"
          onSubmit={(foo) => Promise.resolve(dispatch(updateFoo(foo.id, { message: foo.message })))}
          submitText="Update"
          validate={(values) => {
            const errors = {};
            if (!values.message) {
              errors.id = 'Please, provide message';
            }
            return errors;
          }}
        />
        <DeleteForm
          title="Foo Delete Process"
          message="Are you sure you want to delete the foo?"
          trigger="Delete"
          onSubmit={(foo) => Promise.resolve(dispatch(deleteFoo(foo.id)))}
          submitText="Delete"
          validate={(values) => {
            const errors = {};
            if (!values.id) {
              errors.id = 'Please, provide id';
            }
            return errors;
          }}
        />
      </CRUDTable>
    </div>
  );
};

export default Home;
