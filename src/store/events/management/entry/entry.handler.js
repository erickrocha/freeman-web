import axios from 'axios.config';
import * as events from './entry.events';
import { paramBuilder } from 'shared/utility';

const error = err => {
  return {
    type: events.ENTRY_ERROR,
    error: err
  };
};

const collectEntriesId = user => {
  let entries = [];
  user.days.forEach(day => {
    entries = entries.concat(day.entries);
  });
  // eslint-disable-next-line array-callback-return
  const items = entries.map(entry => {
    if (entry.selected) {
      return entry.id;
    }
  });
  return items;
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.ENTRY_BEGIN });
    const querysParams = paramBuilder(params);
    axios
      .get(`/api/management/entries${querysParams}`)
      .then(response => {
        dispatch({ type: events.QUERY_ENTRY_SUCCESS, entries: response.data.entries });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const approve = (startDate, endDate, user) => {
  return dispatch => {
    dispatch({ type: events.ENTRY_BEGIN });
    const items = collectEntriesId(user);
    axios
      .post('/api/management/approve', { userId: user.userId, items: items, startDate: startDate, endDate: endDate })
      .then(response => {
        dispatch({ type: events.ENTRIES_APPROVED_SUCCESS, userEntry: response.data });
      })
      .catch(err => {
        dispatch({ type: events.ENTRY_ERROR, error: err });
      });
  };
};
