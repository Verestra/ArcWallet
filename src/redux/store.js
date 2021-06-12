import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const enhancers = applyMiddleware(thunk);
// other store enhancers if any
export const store = createStore(rootReducer, enhancers);
export const persistor = persistStore(store);
