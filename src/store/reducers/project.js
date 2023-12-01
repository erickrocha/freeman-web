import * as events from '../events/project/project.events';
import { updateObject, pageBuilder } from '../../shared/utility';

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
  saved: false,
  project: {}
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.PROJECT_BEGIN:
      return updateObject(state, {
        saved: false,
        loading: true,
        error: null
      });
    case events.PROJECT_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case events.QUERY_PROJECTS_SUCCESS:
      return updateObject(state, pageBuilder(payload.data));
    case events.PROJECT_SAVED:
      return updateObject(state, {
        saved: true,
        project: payload.project
      });
    default:
      return state;
  }
};

export default reducer;
