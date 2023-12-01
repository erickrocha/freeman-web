import * as events from './team.events';
import axios from 'axios.config';
import { paramBuilder } from 'shared/utility';

const error = err => {
  return {
    type: events.TEAM_ERROR,
    error: err
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.TEAM_BEGIN });
    const queryString = paramBuilder(params);
    axios
      .get(`/api/management/teams${queryString}`)
      .then(response => {
        dispatch({ type: events.QUERY_TEAM_SUCCESS, data: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};


export const save = team => {
  return dispatch => {
    dispatch({type: events.TEAM_BEGIN});
    axios.post('/api/management/team',team)
    .then(response => {
      dispatch({type: events.TEAM_SAVED, team: response.data });
    })
    .catch(err => {
      error(err.response.data)
    })
  }
}