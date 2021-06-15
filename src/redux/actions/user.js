import Axios from 'axios';
import {fetchRequest, fetchSuccess, fetchFailure} from './fetchHandlers';
export const getUser = (url, token) => {
  const type = 'GET_USER';
  return dispatch => {
    dispatch(fetchRequest(type));
    Axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => dispatch(fetchSuccess(type, res)))
      .catch(err => dispatch(fetchFailure(type, err)));
  };
};
export const updateUser = (url, token, formData) => {
  const type = 'PATCH_updateUSER';
  return dispatch => {
    dispatch(fetchRequest(type));
    Axios.patch(url, formData, {
      headers: {
        'auth-token': token,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => dispatch(fetchSuccess(type, res)))
      .catch(err => dispatch(fetchFailure(type, err)));
  };
};
export const deleteUser = (url, token, data) => {
  const type = 'DELETE_deleteUSER';
  return dispatch => {
    dispatch(fetchRequest(type));
    Axios.delete(url, data, {
      headers: {
        'auth-token': token,
      },
    })
      .then(res => dispatch(fetchSuccess(type, res)))
      .catch(err => dispatch(fetchFailure(type, err)));
  };
};
