import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

// const contactsInitialState = [
//   { name: 'Rosie Simpson', number: '459-12-56', id: 'id-1' },
//   { name: 'Hermione Kline', number: '443-89-12', id: 'id-2' },
//   { name: 'Eden Clements', number: '645-17-79', id: 'id-3' },
//   { name: 'Annie Copeland', number: '227-91-26', id: 'id-4' },
// ];

// const contactsSliceOld = createSlice({
//   name: 'contacts',
//   initialState: {
//     contacts: contactsInitialState,
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     addContact: {
//       reducer(state, action) {
//         state.push(action.payload);
//       },
//       prepare(name, number) {
//         return {
//           payload: {
//             name,
//             number,
//             id: nanoid(),
//           },
//         };
//       },
//     },
//     deleteContact(state, action) {
//       return state.filter(contact => contact.id !== action.payload);
//     },
//   },
// });

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;
