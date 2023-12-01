import * as events from '../events/dashboard/dashboard.events';
import { updateObject } from '../../shared/utility';
import * as dateService from '../../shared/date-service';

const initialState = {
  loading: false,
  error: null,
  reload: false,
  days: dateService.getWeekDays(),
  appointment: {
    date: dateService.getToday(),
    hour: 0,
    minute: 0,
    notes: ''
  },
  open: false
};

const refreshTime = (state, payload) => {
  const day = state.days.find(current => {
    return current.date === payload.appointment.date;
  });
  const appointmentIndex = day.appointments.findIndex(current => {
    return current.id === payload.appointment.id;
  });
  day.appointments[appointmentIndex] = payload.appointment;
  const dayIndex = state.days.findIndex(current => {
    return current.date === payload.appointment.date;
  });
  state.days[dayIndex] = day;
  return updateObject(state, {
    days: [...state.days]
  });
};

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case events.DASHBOARD_BEGIN:
      return updateObject(state, {
        loading: true
      });
    case events.DASHBOARD_LOAD_DASHBOARD:
      return updateObject(state, {
        days: payload.days,
        startDate: payload.startDate,
        endDate: payload.endDate,
        year: payload.year,
        monthOfYear: payload.monthOfYear,
        month: payload.month,
        loading: false,
        error: null,
        reload: false,
        ...payload
      });
    case events.APPOINTMENT_SUCCESS:
      return updateObject(state, {
        appointment: payload.appointment,
        loading: false,
        open: false,
        reload: true
      });
    case events.DASHBOARD_DELETE_APPOINTMENT:
      return updateObject(state, {
        loading: false,
        error: null,
        reload: true
      });
    case events.DASHBOARD_ERROR:
      return updateObject(state, {
        error: state.error,
        loading: false
      });
    case events.DASHBOARD_REFRESH_TIMER:
      return refreshTime(state, payload);
    case events.ADD_APPOINTMENT:
      return updateObject(state, {
        open: true,
        appointment: {
          date: dateService.getToday(),
          hour: 0,
          minute: 0,
          notes: ''
        }
      });
    case events.EDIT_APPOINTMENT:
      return updateObject(state, {
        open: true,
        appointment: payload.appointment
      });
    case events.CANCEL_APPOINTMENT:
      return updateObject(state, {
        open: false,
        appointment: {
          date: dateService.getToday(),
          hour: 0,
          minute: 0,
          notes: ''
        }
      });
    default:
      return state;
  }
};

export default reducer;
