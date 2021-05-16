import { createAsyncThunk } from '@reduxjs/toolkit';

const FIREBASE_DOMAIN =
  'https://async-redux-router-default-rtdb.firebaseio.com';

export const sendQuoteToDB = createAsyncThunk(
  'quotes/sendQuoteToDB',
  async (quoteData) => {
    const { id, author, text, comments } = quoteData;
    try {
      const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
        method: 'POST',
        body: JSON.stringify({
          id,
          author,
          text,
          comments,
        }),
      });
      if (!response.ok) {
        throw new Error('Could not send data to DB!');
      }
    } catch (err) {
      console.log('error>>>', err);
    }
  },
);

export const getAllQuotes = createAsyncThunk(
  'quotes/getAllQuotes',
  async () => {
    try {
      const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
      if (!response.ok) {
        throw new Error('Could not get data from DB!');
      }

      const responseData = await response.json();
      let quotes = [];
      for (const key in responseData) {
        quotes.push({
          id: responseData[key].id,
          author: responseData[key].author,
          text: responseData[key].text,
          comments: responseData[key].comments || [],
        });
      }
      return quotes;
    } catch (err) {
      console.log(err);
    }
  },
);

export const addCommentById = createAsyncThunk(
  'quotes/addCommentById',
  async (requestData) => {
    const response = await fetch(
      `${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(requestData.commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not add comment!');
    }

    return { commentId: data.name };
  },
);

export const getAllCommentsById = createAsyncThunk(
  'quotes/getAllCommentsById',
  async (quoteId) => {
    try {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/comments/${quoteId}.json`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not get comments!');
      }

      const transformedComments = [];

      for (const key in data) {
        const commentObj = {
          id: key,
          text: data[key],
        };
        transformedComments.push(commentObj);
      }
      return transformedComments;
    } catch (err) {
      console.log('Error>>>', err);
    }
  },
);
