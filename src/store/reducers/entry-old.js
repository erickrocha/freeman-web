import * as events from '../events/entry/entry.events';
import { updateObject, pageBuilder, selected, check, checkAll } from '../../shared/utility';

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
  selections: [],
  allChecked: false
};

const setCheck = (data, entryId) => {
  const dataChecked = check(data, entryId);
  const selections = selected(dataChecked);
  const isAllChecked = dataChecked.length === selections.length;
  return {
    data: [...dataChecked],
    selections: [...selections],
    allChecked: isAllChecked
  };
};

const setCheckAll = (data, allChecked) => {
  const dataChecked = checkAll(data, allChecked);
  const selections = selected(dataChecked);
  const isAllChecked = data.length === selections.length;
  return {
    data: [...data],
    selections: [...selections],
    allChecked: isAllChecked
  };
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.ENTRY_BEGIN:
      return updateObject(state, {
        loading: true
      });
    case events.ENTRIES_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case events.QUERY_ENTRIES_SUCCESS:
      return updateObject(state, pageBuilder(payload.data));
    case events.CHECK_ENTRY:
      return updateObject(state,setCheck(state.data, payload.entryId));
    case events.CHECK_ALL_ENTRIES:
      return updateObject(state,setCheckAll(state.data, payload.allChecked));
    default:
      return state;
  }
};

export default reducer;
