import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from './products-thunk';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    notification: null,
  },
  reducers: {
    showNotification: (state, { payload }) => {
      state.notification = {
        status: payload.status,
        title: payload.title,
        message: payload.message,
      };
    },
    hideNotification: (state) => {
      state.notification = null;
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.notification = {
        status: 'success',
        title: 'Success!',
        message: 'Fetching users successfully!',
      };
    },
    [getProducts.pending]: (state) => {
      state.notification = {
        status: 'pending',
        title: 'Pending...',
        message: 'Fetching users!',
      };
    },
    [getProducts.rejected]: (state) => {
      state.notication = {
        status: 'error',
        title: 'Error!',
        message: 'Fetching users failed!',
      };
    },
  },
});

export const { showNotification, hideNotification } = productsSlice.actions;

export default productsSlice.reducer;
