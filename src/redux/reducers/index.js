import auth from './auth';
import user from './user';
import balance from './balance';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'balance', 'user'],
};

const allReducer = combineReducers({
  auth,
  user,
  balance,
});
export default persistReducer(persistConfig, allReducer);
