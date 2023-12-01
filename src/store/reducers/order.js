import * as events from 'store/events/financial/order/order.events';
import { updateObject } from 'shared/utility';

const initialState = {
  loading: false,
  error: null,
  orders: []
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.ORDER_BEGIN:
      return updateObject(state, {
        loading: true,
        error: null
      });
    case events.ORDER_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case events.QUERY_ORDERS_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        orders: payload.data.orders
      });
    default:
      return state;
  }
};

export default reducer;
