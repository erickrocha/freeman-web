import * as event from '../events/supplier/supplier.events';
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
  supplier: {
    address: {
      province: {}
    }
  },
  saved: false
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case event.SUPPLIER_BEGIN:
      return updateObject(state, {
        saved: false,
        loading: true,
        error: null
      });
    case event.QUERY_SUPPLIER_SUCCESS:
      return updateObject(state, pageBuilder(payload.data));
    case event.SUPPLIER_ERROR:
      return updateObject(state, {
        loading: false,
        error: payload.error
      });
    case event.SUPPLIER_SAVED:
      return updateObject(state, {
        saved: true,
        supplier: payload.supplier,
      });
    case event.GET_SUPPLIER_SUCCESS:
      return updateObject(state, {
        supplier: payload.supplier,
        saved: false
      });
    case event.EMPLOYEE_SAVED: {
      state.supplier.employees.push(payload.employee);
      return updateObject(state, {
        supplier: state.supplier,
        saved: true
      });
    }
    default:
      return state;
  }
};

export default reducer;
