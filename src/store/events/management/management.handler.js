import axios from '../../../axios.config';
import * as events from './management.events';
import { paramBuilder } from 'shared/utility';

const error = err => {
  return {
    type: events.MANAGEMENT_DASHBOARD_ERROR,
    error: err
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.MANAGEMENT_DASHBOARD_ERROR });
    const queryString = paramBuilder(params);
    axios
      .get(`/api/management/dashboard${queryString}`)
      .then(response => {
        dispatch({ type: events.QUERY_MANAGEMENT_DASHBOARD_SUCCESS, projects: response.data.projects });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};
