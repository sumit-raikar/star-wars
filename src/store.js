import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import rootReducer from './reducer';
export default function configureStore() {
  const loggerMiddleware = createLogger()
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware,loggerMiddleware)
  );
}