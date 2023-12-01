import axios from '../../../axios.config';
import * as events from './project.events';

const error = error => {
  return {
    type: events.PROJECT_ERROR,
    error: error,
    loading: false
  };
};

export const save = project => {
  return dispatch => {
    dispatch({type:events.PROJECT_BEGIN})
    axios
      .post('/api/management/projects', project)
      .then(response => {
        dispatch({ type: events.PROJECT_SAVED, project: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.PROJECT_BEGIN });
    var queryString = Object.keys(params)
      .filter(key => params[key])
      .map(key => key + '=' + params[key])
      .join('&');
    axios
      .get(`/api/management/projects?${queryString}`)
      .then(response => {
        dispatch({ type: events.QUERY_PROJECTS_SUCCESS, data: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};
