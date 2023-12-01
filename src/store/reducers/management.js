import * as events from '../events/management/management.events';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: null,
  projects: []
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.MANAGEMENT_DASHBOARD_BEGIN:
      return updateObject(state, {
        loading: true,
        error: null
      });
    case events.MANAGEMENT_DASHBOARD_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case events.QUERY_MANAGEMENT_DASHBOARD_SUCCESS:
      return updateObject(state, {
        projects: payload.projects,
        loading: false
      });
    default:
      return state;
  }
};

export default reducer;
