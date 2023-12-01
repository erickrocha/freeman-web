import * as events from '../events/management/entry/entry.events';
import { updateObject, findOne, findOneByField } from 'shared/utility';

const initialState = {
  loading: false,
  error: null,
  entries: [],
  hasSelected: false
};

const checkById = (state, payload) => {
  const userId = payload.userId;
  const date = payload.date;
  const entryId = payload.entryId;

  const userEntry = findOneByField(state.entries, 'userId', userId);

  const day = findOneByField(userEntry.days, 'date', date);

  const entry = findOne(day.entries, entryId);
  entry.selected = !entry.selected;

  const hasSelected = entry.selected;

  return updateObject(state, {
    entries: [...state.entries],
    hasSelected: hasSelected
  });
};

const checkByDate = (state, payload) => {
  const userId = payload.userId;
  const date = payload.date;

  const userEntry = findOneByField(state.entries, 'userId', userId);

  const day = findOneByField(userEntry.days, 'date', date);

  day.selected = !day.selected;
  day.entries.forEach(entry => {
    entry.selected = day.selected;
  });

  return updateObject(state, {
    entries: [...state.entries],
    hasSelected: day.selected
  });
};

const checkByUser = (state, payload) => {
  const userId = payload.userId;
  const userEntry = findOneByField(state.entries, 'userId', userId);

  userEntry.selected = !userEntry.selected;
  userEntry.days.forEach(day => {
    day.selected = userEntry.selected;
    day.entries.forEach(entry => {
      entry.selected = day.selected;
    });
  });
  return updateObject(state, {
    entries: [...state.entries],
    hasSelected: userEntry.selected
  });
};

const userEntriesApproved = (state, payload) => {
  const userEntry = payload.userEntry;
  const userIndex = state.entries.findIndex(current => {
    return current.userId === userEntry.userId;
  });
  state.entries[userIndex] = userEntry;
  return updateObject(state, {
    entries: [...state.entries],
    hasSelected: false
  });
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.ENTRY_BEGIN:
      return updateObject(state, {
        loading: true,
        error: null
      });
    case events.ENTRY_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case events.QUERY_ENTRY_SUCCESS:
      return updateObject(state, {
        loading: false,
        entries: payload.entries
      });
    case events.CHECK_BY_ID:
      return checkById(state, payload);
    case events.CHECK_BY_DATE:
      return checkByDate(state, payload);
    case events.CHECK_BY_USER:
      return checkByUser(state, payload);
      case events.ENTRIES_APPROVED_SUCCESS: 
      return userEntriesApproved(state,payload);
    default:
      return state;
  }
};

export default reducer;
