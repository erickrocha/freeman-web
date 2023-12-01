import axios from 'axios.config';
import * as events from './supplier.events';
import { paramBuilder } from 'shared/utility';

const error = error => {
  return {
    type: events.SUPPLIER_ERROR,
    error: error,
    loading: false
  };
};

export const save = supplier => {
  return dispatch => {
    dispatch({ type: events.SUPPLIER_BEGIN });
    axios
      .post('/api/supply/supplier', supplier)
      .then(response => {
        dispatch({ type: events.SUPPLIER_SAVED, supplier: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const addEmployee = (supplierId, employee) => {
  return dispatch => {
    dispatch({ type: events.SUPPLIER_BEGIN });
    axios
      .post(`/api/supply/supplier/${supplierId}/employee`, employee)
      .then(response => {
        dispatch({ type: events.EMPLOYEE_SAVED, employee: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.SUPPLIER_BEGIN });
    const queryString = paramBuilder(params);
    axios
      .get(`/api/supply/suppliers${queryString}`)
      .then(response => {
        dispatch({ type: events.QUERY_SUPPLIER_SUCCESS, data: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const get = id => {
  return dispatch => {
    dispatch({ type: events.SUPPLIER_BEGIN });
    axios
      .get(`/api/supply/supplier/${id}`)
      .then(response => {
        dispatch({ type: events.GET_SUPPLIER_SUCCESS, supplier: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};
