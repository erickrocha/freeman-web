import axios from 'axios.config';
import * as events from './payment.events';
import { paramBuilder } from 'shared/utility';

const error = err => {
  return {
    type: events.PAYMENT_ERROR,
    error: error,
    loading: false
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.PAYMENT_BEGIN });
    const queryString = paramBuilder(params);
    axios
      .get(`/api/financial/payments${queryString}`)
      .then(response => {
        dispatch({ type: events.QUERY_PAYMENT_SUCCESS, data: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const invoices = ids => {
  return dispatch => {
    dispatch({ type: events.PAYMENT_BEGIN });
    axios
      .post(`/api/financial/invoices`, { payments: ids })
      .then(response => {
        dispatch({ type: events.PAYMENT_REQUEST_INVOICES_SUCCESS, data: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
}