import * as events from 'store/events/report/report.events';
import { updateObject } from 'shared/utility';

const initialState = {
  loading: false,
  error: null,
  data: {
    projects: []
  }
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.REPORT_BEGIN:
      return updateObject(state, {
        loading: true
      });
    case events.REPORT_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case events.PROJECT_REPORT_QUERY_SUCCESS:
      return updateObject(state, {
        data: payload.data
      });
    case events.TIME_REPORT_QUERY_SUCCESS:
      return updateObject(state, {
        data: payload.data
      });
    default:
      return state;
  }
};

export default reducer;
