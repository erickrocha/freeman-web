import * as events from '../events/management/team/team.events';
import { updateObject, pageBuilder } from 'shared/utility';

const initialState = {
  loading: false,
  error: null,
  data: [],
  page: {
    number: 1,
    size: 5,
    first: true,
    last: false,
    totalPages: 0,
    totalItems: 0
  },
  team: {
    members: []
  },
  saved: false
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.TEAM_BEGIN:
      return updateObject(state, {
        saved: false,
        loading: true,
        error: null
      });
    case events.TEAM_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case events.QUERY_TEAM_SUCCESS:
      return updateObject(state, pageBuilder(payload.data));
    case events.TEAM_SAVED:
      return updateObject(state, {
        saved: true,
        team: payload.team,
      });
    default:
      return state;
  }
};

export default reducer;
