import * as events from '../events/contract/contract.events';
import { updateObject } from '../../shared/utility';

const initialState = {
  contracts: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case events.CONTRACT_BEGIN:
      return updateObject(state, { error: null, loading: true, contracts: [] });
    case events.LOAD_CONTRACTS:
      return updateObject(state, {
        contracts: action.contracts,
        loading: false,
        error: null
      });
    case events.CONTRACT_ERROR:
      return updateObject(state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
};

export default reducer;
