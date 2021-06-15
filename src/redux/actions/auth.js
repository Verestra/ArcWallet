import Axios from 'axios';
import {fetchRequest, fetchSuccess, fetchFailure} from './fetchHandlers';
import {setBalance} from './balance';
export const postLogin = (url, data) => {
  const type = 'POST_LOGIN';
  return dispatch => {
    dispatch(fetchRequest(type));
    Axios.post(url, data)
      .then(res => {
        dispatch(fetchSuccess(type, res));
        dispatch(setBalance(res.data.data.balance));
      })
      .catch(err => dispatch(fetchFailure(type, err)));
  };
};

export const postRegister = (url, data) => {
  const type = 'POST_REGISTER';
  return dispatch => {
    dispatch(fetchRequest(type));
    Axios.post(url, data)
      .then(res => dispatch(fetchSuccess(type, res)))
      .catch(err => dispatch(fetchFailure(type, err)));
  };
};
export const postSendOTP = (url, data) => {
  const type = 'POST_sendOTP';
  return dispatch => {
    dispatch(fetchRequest(type));
    Axios.post(url, data)
      .then(res => dispatch(fetchSuccess(type, res)))
      .catch(err => dispatch(fetchFailure(type, err)));
  };
};
export const postVerifyOTP = (url, data) => {
  const type = 'POST_verifyOTP';
  return dispatch => {
    dispatch(fetchRequest(type));
    Axios.post(url, data)
      .then(res => dispatch(fetchSuccess(type, res)))
      .catch(err => dispatch(fetchFailure(type, err)));
  };
};
export const postResetPassword = (url, data, token) => {
  const type = 'POST_RESET_PASSWORD';
  return dispatch => {
    dispatch(fetchRequest(type));
    Axios.post(url, data)
      .then(res => dispatch(fetchSuccess(type, res)))
      .catch(err => dispatch(fetchFailure(type, err)));
  };
};
export const postLogout = (url, token) => {
  const type = 'POST_LOGOUT';
  return dispatch => {
    dispatch(fetchRequest(type));
    Axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => dispatch(fetchSuccess(type, res)))
      .catch(err => dispatch(fetchFailure(type, err)));
  };
};
