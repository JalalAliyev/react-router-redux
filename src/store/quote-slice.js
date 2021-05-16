import { createSlice } from '@reduxjs/toolkit';
import { getAllQuotes, getAllCommentsById } from './actions-thunk';

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    quotes: [],
    comments: [],
    loaded: false,
  },
  reducers: {
    addQuote(state, { payload }) {
      state.quotes.push(payload.quoteData);
    },
    clearComments(state) {
      state.comments = [];
    },
  },
  extraReducers: {
    [getAllQuotes.fulfilled]: (state, { payload }) => {
      state.quotes = payload;
      state.loaded = true;
    },
    [getAllCommentsById.fulfilled]: (state, { payload }) => {
      state.comments = payload;
    },
  },
});

export const { addQuote, clearComments } = quotesSlice.actions;

export default quotesSlice.reducer;
