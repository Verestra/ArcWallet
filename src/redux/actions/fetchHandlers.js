export const fetchRequest = (type, payload) => {
  return {
    type: `${type}_PENDING`,
    payload,
  };
};
export const fetchFailure = (type, payload) => {
  return {
    type: `${type}_REJECTED`,
    payload,
  };
};
export const fetchSuccess = (type, payload) => {
  return {
    type: `${type}_FULFILLED`,
    payload,
  };
};
