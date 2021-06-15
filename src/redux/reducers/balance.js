const initialState = {
  balance: 0,
};

const balance = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'SET_BALANCE':
      return {
        ...state,
        balance: payload,
      };

    default:
      return {...state};
  }
};

export default balance;
