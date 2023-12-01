import * as events from '../events/user/user.events';
import { updateObject, pageBuilder } from '../../shared/utility';

const initialState = {
  loading: false,
  error: null,
  token: null,
  data: [],
  page: {
    number: 1,
    size: 5,
    first: true,
    last: false,
    totalPages: 0,
    totalItems: 0
  },
  saved: false,
  user: {}
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.USER_BEGIN:
      return updateObject(state, { saved: false, error: null, loading: true });
    case events.USER_AUTHENTICATION:
      return updateObject(state, {
        token: payload.token,
        error: null,
        loading: false
      });
    case events.USER_ERROR:
      return updateObject(state, {
        error: payload.error,
        loading: false
      });
    case events.USER_LOGOUT:
      return updateObject(state, initialState);
    case events.USER_PASSWORD_UPDATED:
      return updateObject(state, {
        loading: false,
        error: null,
        user: state.user
      });
    case events.USER_SAVED:
      return updateObject(state, {
        saved: true,
        user: payload.user
      });
    case events.QUERY_USER_SUCCESS:
      return updateObject(state, pageBuilder(payload.data));
    case events.GET_USER_SUCCESS:
      return updateObject(state, {
        user: payload.user
      });
    default:
      return state;
  }
};

export default reducer;
