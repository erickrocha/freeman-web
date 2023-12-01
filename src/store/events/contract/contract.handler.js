import axios from '../../../axios.config';
import * as event from './contract.events';

export const begin = () => {
  return {
    type: event.CONTRACT_BEGIN,
    loading: true,
    contracts: []
  };
};

export const success = contracts => {
  return {
    type: event.LOAD_CONTRACTS,
    contracts: contracts,
    loading: false
  };
};

export const error = err => {
  return {
    type: event.CONTRACT_ERROR,
    error: err,
    loading: false
  };
};

export const getAllContracts = () => {
  return dispatch => {
    dispatch(begin());
    axios
      .get('/api/contracts')
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(err => {
        dispatch(error(err));
      });
  };
};
