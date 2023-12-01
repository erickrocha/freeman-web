import * as events from '../events/financial/payment/payment.events';
import { updateObject } from 'shared/utility';

const initialState = {
  loading: false,
  error: null,
  payments: []
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.PAYMENT_BEGIN:
      return updateObject(state, {
        loading: true,
        error: null
      });
    case events.PAYMENT_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case events.QUERY_PAYMENT_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        payments: payload.data.payments
      });
    case events.PAYMENT_REQUEST_INVOICES_SUCCESS:
      return state
    default:
      return state;
  }
};

export default reducer;
