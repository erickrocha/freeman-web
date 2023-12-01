import * as event from '../events/customer/customer.events';
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
  customer: {
    address: {
      province: {}
    }
  },
  saved: false
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case event.CUSTOMER_BEGIN:
      return updateObject(state, {
        saved: false,
        loading: true,
        error: null
      });
    case event.QUERY_CUSTOMER_SUCCESS:
      return updateObject(state, pageBuilder(payload.data));
    case event.CUSTOMER_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case event.GET_CUSTOMER_SUCCESS:
      return updateObject(state, {
        customer: payload.customer
      })
    case event.CUSTOMER_SAVED:
      return updateObject(state, {
        saved: true,
        customer: payload.customer,
      });
    default:
      return state;
  }
};

export default reducer;
