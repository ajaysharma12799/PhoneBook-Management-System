/* eslint-disable valid-typeof */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../API';

const initialState = {
  contacts: [],
  currentContact: null,
};

export const asyncFetchAllContacts = createAsyncThunk('contact/fetchAllContacts', async () => {
  const response = await axios.get(API);
  return response.data;
});

export const asyncAddContact = createAsyncThunk('contact/addContact', async (contact) => {
  const response = await axios.post(API, contact);
  return response.data;
});

export const asyncDeleteContact = createAsyncThunk('contact/deleteContact', async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

export const asyncSetCurrentContact = createAsyncThunk('contact/setCurrentContact', async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
});

export const asyncUpdateContact = createAsyncThunk('contact/updateContact', async ({ id, contact }) => {
  const response = await axios.put(`${API}/${id}`, contact);
  return response.data;
});

const contactSlice = createSlice({
  name: 'Contact Slice',
  initialState,
  reducers: {
    searchContact: (state, { payload }) => {
      const input = payload;

      let result;
      if (!Number.isNaN(parseInt(input))) {
        result = state.contacts.filter((contact) => contact.number.includes(payload));
      } else {
        result = state.contacts.filter((contact) => contact.name.includes(payload));
      }
      state.contacts = result;
    },
  },
  extraReducers: {
    [asyncFetchAllContacts.fulfilled]: (state, { payload }) => ({
      ...state,
      contacts: payload,
    }),
    [asyncAddContact.fulfilled]: (state, { payload }) => ({
      ...state,
      contacts: [...state.contacts, payload],
    }),
    [asyncDeleteContact.fulfilled]: (state, { payload }) => ({
      ...state,
      contacts: state.contacts.filter((contact) => contact.id !== payload),
    }),
    [asyncSetCurrentContact.fulfilled]: (state, { payload }) => ({
      ...state,
      currentContact: payload,
    }),
    [asyncUpdateContact.fulfilled]: (state, { payload }) => ({
      ...state,
      contacts: state.contacts.map((contact) => (contact.id === payload.id ? payload : contact)),
    }),
  },
});

export const { searchContact, clearContact } = contactSlice.actions;

export default contactSlice.reducer;
