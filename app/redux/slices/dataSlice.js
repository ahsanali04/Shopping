import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  users: [],
  cart: [],
  quantity: [],
  products: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateContacts: (state, action) => {
      state.contacts = action.payload;
    },
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
    updateQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  updateContacts,
  updateCart,
  updateUsers,
  updateProducts,
  updateQuantity,
} = dataSlice.actions;

export const selectContacts = state => state.data.contacts;
export const selectUsers = state => state.data.users;
export const selectProducts = state => state.data.products;
export const selectCart = state => state.data.cart;
export const selectQuantity = state => state.data.quantity;
export default dataSlice.reducer;
