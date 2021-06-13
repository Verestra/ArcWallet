import auth from './auth';
import user from './user';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const allReducer = combineReducers({
  auth,
  user,
});
export default persistReducer(persistConfig, allReducer);
