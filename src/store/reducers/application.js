import * as events from '../events/application/application.events';
import { updateObject } from '../../shared/utility';

const initialState = {
  provinces: [],
  owners: [],
  menus: [],
  myProjects: [],
  players: [],
  techLeads: [],
  user: null,
  person: {
    address: {}
  },
  managers: [],
  profiles: [],
  loading: false,
  error: null,
  success: false,
  print: false
};

const reducer = (state = initialState, event) => {
  switch (event.type) {
    case events.APPLICATION_BEGIN:
      return updateObject(state, {
        success: false,
        loading: true
      });
    case events.LOAD_CONFIGURATION:
      return updateObject(state, {
        loading: false,
        ...event
      });
    case events.APPLICATION_ERROR:
      return updateObject(state, {
        error: event.error,
        success: false,
        loading: false
      });
    case events.SAVE_ACCOUNT:
      return updateObject(state, {
        success: true
      });
    default:
      return state;
  }
};

export default reducer;
