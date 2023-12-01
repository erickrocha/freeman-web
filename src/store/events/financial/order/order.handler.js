import axios from 'axios.config';
import * as events from './order.events';
import { paramBuilder } from 'shared/utility';

const error = err => {
  return {
    type: events.ORDER_ERROR,
    error: error,
    loading: false
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.ORDER_BEGIN });
    const queryString = paramBuilder(params);
    axios
      .get(`/api/financial/orders${queryString}`)
      .then(response => {
        dispatch({ type: events.QUERY_ORDERS_SUCCESS, data: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};
