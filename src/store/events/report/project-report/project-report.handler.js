import axios from 'axios.config';
import * as events from '../report.events';
import { paramBuilder } from 'shared/utility';

const error = err => {
  return {
    type: events.REPORT_ERROR,
    error: err
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.REPORT_BEGIN });
    const queryString = paramBuilder(params);
    axios
      .get(`/api/reports/projects${queryString}`)
      .then(response => {
        dispatch({ type: events.PROJECT_REPORT_QUERY_SUCCESS, data: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};
