import { useReducer, useCallback } from 'react';

const httpReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        data: null,
        error: null,
        status: 'pending',
      };
    case 'SUCCESS':
      return {
        data: action.responseData,
        error: null,
        status: 'success',
      };
    case 'ERROR':
      return {
        data: null,
        error: action.errorMessage,
        status: 'failed',
      };
    default:
      return state;
  }
};

const useHttp = (requestFunction, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData });
      } catch (err) {
        dispatch({
          type: 'ERROR',
          errorMessage: err.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction],
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
