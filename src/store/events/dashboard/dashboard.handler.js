import axios from '../../../axios.config';
import * as events from '../dashboard/dashboard.events';
import { paramBuilder } from 'shared/utility';

const begin = () => {
  return { type: events.DASHBOARD_BEGIN };
};
const error = error => {
  return {
    type: events.DASHBOARD_ERROR,
    loading: false,
    error: error
  };
};

// async requests

export const getDashboardByUserId = params => {
  return dispatch => {
    dispatch(begin());
    const queryString = paramBuilder(params);
    axios
      .get(`/api/dashboard/${queryString}`)
      .then(response => {
        dispatch({
          type: events.DASHBOARD_LOAD_DASHBOARD,
          year: response.data.year,
          monthOfYear: response.data.monthOfYear,
          month: response.data.month,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          days: response.data.days
        });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const executeStartStopTimer = entry => {
  return dispatch => {
    dispatch(begin());
    axios
      .post('/api/dashboard/appointment/startStop', entry)
      .then(response => {
        dispatch({
          type: events.APPOINTMENT_SUCCESS,
          appointment: response.data
        });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const executeAddAppointment = startEntry => {
  return dispatch => {
    dispatch(begin());
    axios
      .post('/api/dashboard/appointment/finish', startEntry)
      .then(response => {
        dispatch({
          type: events.APPOINTMENT_SUCCESS,
          appointment: response.data
        });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const executeUpdate = appointment => {
  return dispatch => {
    dispatch(begin());
    axios
      .put(`/api/dashboard/appointment/${appointment.id}`, appointment)
      .then(response => {
        dispatch({
          type: events.APPOINTMENT_SUCCESS,
          appointment: response.data
        });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const executeRemove = appointment => {
  return dispatch => {
    dispatch(begin());
    axios
      .delete(`/api/dashboard/appointment/${appointment.id}`)
      .then(() => {
        dispatch({
          type: events.DASHBOARD_DELETE_APPOINTMENT
        });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const executeEntryFinish = appointment => {
  return dispatch => {
    dispatch(begin());
    axios
      .put(`/api/dashboard/appointment/${appointment.id}/finish`, appointment)
      .then(response => {
        dispatch({
          type: events.APPOINTMENT_SUCCESS,
          appointment: response.data
        });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const refreshTimer = appointment => {
  return dispatch => {
    dispatch({ type: events.DASHBOARD_REFRESH_TIMER, appointment: appointment });
  };
};
