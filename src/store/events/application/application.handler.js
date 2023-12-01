import axios from '../../../axios.config';
import * as event from './application.events';

const error = err => {
  return {
    type: event.APPLICATION_ERROR,
    error: err
  };
};

export const loadConfig = () => {
  return dispatch => {
    dispatch({ type: event.APPLICATION_BEGIN });
    axios
      .get('/api/application/configuration')
      .then(response => dispatch({ type: event.LOAD_CONFIGURATION, ...response.data }))
      .catch(err => dispatch(error(err.response.data)));
  };
};

export const savePerson = (id, person) => {
  return dispatch => {
    dispatch({ type: event.APPLICATION_BEGIN });
    axios
      .put(`/api/hr/person/${id}`, person)
      .then(resp => {
        dispatch({ type: event.SAVE_ACCOUNT, person: resp.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};
