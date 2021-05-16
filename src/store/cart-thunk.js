import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from './products-slice';

export const sendCartToDB = createAsyncThunk(
  'cart/sendCartToDB',
  async (cartData) => {
    const { items, totalAmount, totalQuantity } = cartData;
    const putCart = async () => {
      const response = await fetch(
        'https://custom-hook-3ee88-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items,
            totalAmount,
            totalQuantity,
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      return responseData;
    };
    try {
      return await putCart();
    } catch (err) {
      return err;
    }
  },
);

export const getCartFromDB = createAsyncThunk(
  'cart/getCartFromDB',
  async (dispatch) => {
    const getCart = async () => {
      const response = await fetch(
        'https://custom-hook-3ee88-default-rtdb.firebaseio.com/cart.json',
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      return {
        items: responseData.items || [],
        totalAmount: responseData.totalAmount || 0,
        totalQuantity: responseData.totalQuantity || 0,
      };
    };
    try {
      return await getCart();
    } catch (err) {
      return dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching users failed!',
        }),
      );
    }
  },
);
