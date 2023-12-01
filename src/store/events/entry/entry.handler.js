import axios from '../../../axios.config';
import * as events from './entry.events';
import { paramBuilder } from 'shared/utility';

const error = error => {
  return {
    type: events.ENTRIES_ERROR,
    error: error,
    loading: false
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.ENTRY_BEGIN });
    const queryString = paramBuilder(params);
    axios
      .get(`/api/management/entries${queryString}`)
      .then(response => {
        dispatch({ type: events.QUERY_ENTRIES_SUCCESS, data: response.data });
      })
      .catch(err => dispatch(error(err.response.data)));
  };
};

export const approve = id => {
  return approveAll([id]);
};

export const approveAll = selection => {
  return dispatch => {
    dispatch({ type: events.ENTRY_BEGIN });
    axios
      .post('/api/management/entries', selection)
      .then(response => {
        dispatch({ type: events.APPROVE_ENTRY_SUCCESS, entries: response.data });
      })
      .catch(err => dispatch(error(err.response.data)));
  };
};
