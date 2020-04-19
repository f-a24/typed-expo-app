import {
  Action,
  createStore,
  applyMiddleware,
  combineReducers,
  Store
} from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

/* from app */
import { getActiveRouteName } from 'app/src/navigation/AppNavigator';
import reducers from 'app/src/reducers';

const logger = () => (next: (action: Action) => void) => (action: Action) => {
  if (__DEV__ && action.type.indexOf('Navigation') === -1) {
    console.log(action);
  }
  next(action);
};

const screenTracking = (store: Store) => (next: (action: Action) => void) => (
  action: Action
) => {
  if (
    action.type.indexOf('Navigation') === -1 ||
    action.type === 'TAKEMODAL_CLOSE'
  ) {
    return next(action);
  }
  const currentScreen = getActiveRouteName(store.getState().nav);
  const result = next(action);
  const nextScreen = getActiveRouteName(store.getState().nav);

  store.dispatch({
    type: 'SCREEN_SET',
    payload: {
      current: currentScreen,
      next: nextScreen
    }
  });

  return result;
};

/* create store */
const store = createStore(
  combineReducers({ ...reducers }),
  applyMiddleware(
    createReactNavigationReduxMiddleware(state => state.nav, 'root'),
    logger,
    screenTracking
  )
);

export default store;
