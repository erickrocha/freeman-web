import * as events from '../events/hr/hr.events';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: null,
  data: [],
  page: 1,
  size: 5,
  first: true,
  last: false,
  reload: false,
  totalPages: 0,
  totalItems: 0,
  legalPerson: {
    address: {}
  },
  open: false
};

const setSelected = (state, id) => {
  const legalPersons = state.data;
  const legalPerson = legalPersons.find(current => {
    return current.id === id;
  });
  const index = legalPersons.findIndex(current => {
    return current.id === id;
  });
  legalPersons.forEach(element => {
    element.selected = false;
  });
  legalPerson.selected = true;
  legalPersons[index] = legalPerson;
  return updateObject(state, {
    data: [...legalPersons]
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case events.ADDING_LEGAL_PERSON_BEGIN:
      return updateObject(state, {
        loading: true,
        reload: false
      });
    case events.ADDING_LEGAL_PERSON_SUCCESS:
      return updateObject(state, {
        loading: false,
        legalPerson: action.legalPerson,
        reload: true
      });
    case events.ADDING_LEGAL_PERSON_ERROR:
      return updateObject(state, {
        loading: false,
        reload: false,
        error: action.error
      });
    case events.GETTING_LEGAL_PERSON_BEGIN:
      return updateObject(state, {
        loading: true,
        legalPerson: {},
        success: false
      });
    case events.GETTING_LEGAL_PERSON_SUCCESS:
      return updateObject(state, {
        loading: false,
        data: action.data.content,
        page: action.data.pageable.pageNumber + 1,
        size: action.data.size,
        first: action.data.first,
        last: action.data.last,
        totalPages: action.data.totalPages,
        totalItems: action.data.totalElements,
        reload: false
      });
    case events.SET_FIELD:
      return updateObject(state, {
        [action.field]: action.value
      });
    case events.GETTING_LEGAL_PERSON_ERROR:
      return updateObject(state, {
        loading: false,
        error: action.error
      });
    case events.SET_SELECTED:
      return setSelected(state, action.id);
    case events.SHOW_FORM:
      return updateObject(state, {
        open: action.open
      });
    default:
      return state;
  }
};

export default reducer;
