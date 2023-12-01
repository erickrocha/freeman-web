import axios from 'axios.config';
import * as events from './customer.events';
import { paramBuilder } from 'shared/utility';

const error = error => {
  return {
    type: events.CUSTOMER_ERROR,
    error: error,
    loading: false
  };
};

export const save = customer => {
  return dispatch => {
    dispatch({ type: events.CUSTOMER_BEGIN });
    axios
      .post('/api/crm/customer', customer)
      .then(response => {
        dispatch({ type: events.CUSTOMER_SAVED, customer: response.data });
      })
      .catch(err => {
        error(err.response.data);
      });
  };
};

export const get = id => {
  return dispatch => {
    dispatch({ type: events.CUSTOMER_BEGIN });
    axios
      .get(`/api/crm/customer/${id}`)
      .then(response => {
        dispatch({ type: events.GET_CUSTOMER_SUCCESS, customer: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.CUSTOMER_BEGIN });
    const queryString = paramBuilder(params);
    axios
      .get(`/api/crm/customers${queryString}`)
      .then(response => {
        dispatch({ type: events.QUERY_CUSTOMER_SUCCESS, data: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};
