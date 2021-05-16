import { createSlice } from '@reduxjs/toolkit';
import { getCartFromDB } from './cart-thunk';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceItems(state, { payload }) {
      state.items = payload.items;
      state.totalAmount = payload.totalAmount;
      state.totalQuantity = payload.totalQuantity;
    },
    addItem(state, { payload }) {
      state.changed = true;
      state.totalAmount += payload.price * payload.quantity;
      state.totalQuantity += payload.quantity;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === payload.id,
      );
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        state.items[existingCartItemIndex].amount +=
          payload.price * payload.quantity;
        state.items[existingCartItemIndex].quantity += payload.quantity;
      } else {
        state.items.push(payload);
      }
    },
    dropItems(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.changed = true;
    },
    dropItem(state, { payload }) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === payload.id,
      );
      state.changed = true;
      state.totalAmount -= state.items[existingCartItemIndex].amount;
      state.totalQuantity -= state.items[existingCartItemIndex].quantity;
      state.items = state.items.filter((item) => item.id !== payload.id);
    },
    increaseQuantity(state, { payload }) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === payload.id,
      );
      const { price } = state.items[existingCartItemIndex];
      state.changed = true;
      state.items[existingCartItemIndex].quantity += 1;
      state.items[existingCartItemIndex].amount += price;
      state.totalAmount += price;
      state.totalQuantity += 1;
    },
    decreaseQuantity: (state, { payload }) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === payload.id,
      );
      const { quantity, price } = state.items[existingCartItemIndex];
      state.changed = true;
      state.items[existingCartItemIndex].quantity -= 1;
      state.items[existingCartItemIndex].amount -= Number(price);
      state.totalAmount -= Number(price);
      state.totalQuantity -= 1;
      if (quantity === 1) {
        state.items = state.items.filter((item) => item.id !== payload.id);
      }
    },
  },
  extraReducers: {
    [getCartFromDB.fulfilled]: (state, { payload }) => {
      state.items = payload.items;
      state.totalAmount = payload.totalAmount;
      state.totalQuantity = payload.totalQuantity;
    },
  },
});

export const {
  replaceItems,
  addItem,
  dropItems,
  dropItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
