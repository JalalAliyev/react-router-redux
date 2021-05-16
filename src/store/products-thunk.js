import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {showNotification} from './products-slice'

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (search, dispatch) => {
    const APP_ID = '623e4028';
    const APP_KEY = '9f5a101eadd6f86e649a21d4167412e1	';
    const url = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Could not load foods');
      }
      const responseData = await response.json();
      if (!responseData) {
        throw new Error('Something went wrong. Try again');
      }
      const recipes = responseData.hits.map((recipe) => ({
        id: uuidv4(),
        name: recipe.recipe.label,
        description: recipe.recipe.dishType,
        imageUrl: recipe.recipe.image,
        ingridients: recipe.recipe.ingridients,
        sourceUrl: recipe.recipe.url,
        price: Number((Math.random() * 100).toFixed(2)),
      }));
      return recipes;
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
