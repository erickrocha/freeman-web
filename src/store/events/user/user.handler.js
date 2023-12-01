import axios from '../../../axios.config';
import * as events from '../user/user.events';
import * as dateService from '../../../shared/date-service';

const error = error => {
  return {
    type: events.USER_ERROR,
    error: error,
    loading: false
  };
};

// Exported methods

export const get = id => {
  return dispatch => {
    dispatch({ type: events.USER_BEGIN });
    axios
      .get(`/api/security/users/${id}`)
      .then(response => {
        dispatch({ type: events.GET_USER_SUCCESS, user: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const save = user => {
  return dispatch => {
    dispatch({ type: events.USER_BEGIN });
    axios
      .post('/api/security/users', user)
      .then(response => {
        dispatch({ type: events.USER_SAVED, user: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const query = params => {
  return dispatch => {
    dispatch({ type: events.USER_BEGIN });
    var queryString = Object.keys(params)
      .filter(key => params[key])
      .map(key => key + '=' + params[key])
      .join('&');
    axios
      .get(`/api/security/users?${queryString}`)
      .then(response => {
        dispatch({ type: events.QUERY_USER_SUCCESS, data: response.data });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const loadUser = () => {
  return dispatch => {
    dispatch({ type: events.USER_BEGIN });
    axios
      .get('/api/security/users/logged')
      .then(response => {
        dispatch({
          type: events.LOAD_USER,
          user: response.data,
          loading: false
        });
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 100);
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: events.USER_LOGOUT
  };
};

export const isAlreadyLogged = () => {
  return dispatch => {
    dispatch({ type: events.USER_BEGIN, loading: true });
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = dateService.getDateTime(localStorage.getItem('expirationDate'));
      if (expirationDate.isBefore(dateService.getTodayNow())) {
        dispatch(logout());
      } else {
        dispatch({
          type: events.USER_AUTHENTICATION,
          token: token,
          loading: false
        });
      }
    }
  };
};

export const authentication = (email, password) => {
  return dispatch => {
    dispatch({ type: events.USER_BEGIN, loading: true });
    const authData = {
      email: email,
      password: password
    };
    axios
      .post('/login', authData)
      .then(response => {
        const expirationDate = dateService.getToday().add(response.data.expireIn, 'ms');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate.format(dateService.ISO_DATE_TIME));
        dispatch({ type: events.USER_AUTHENTICATION, toke: response.data.token });
        // dispatch(checkAuthTimeout(response.data.expireIn));
      })
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const updatePassword = (password, confirmPassword) => {
  return dispatch => {
    dispatch({ type: events.USER_BEGIN, loading: true });
    axios
      .post('/api/security/users/updatePassword', { password: password, confirmPassword: confirmPassword })
      .then(dispatch({ type: events.USER_PASSWORD_UPDATED }))
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};

export const updateUser = user => {
  return dispatch => {
    dispatch({ type: events.USER_BEGIN });
    axios
      .post('/api/security/users', user)
      .then(dispatch())
      .catch(err => {
        dispatch(error(err.response.data));
      });
  };
};
