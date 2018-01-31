import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from 'redux-persist';
import storage from 'redux-persist/es/storage';

import counterReducer from './src/Reducers/counterReducer';
import NavigationReducer from './src/Reducers/navigationReducer';
import auth from './src/Reducers/auth';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import RNFirebase from 'react-native-firebase';

import {
  reactReduxFirebase,
  firebaseStateReducer,
  getFirebase
} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

const config = {
  key: 'root',
  storage,
  blacklist: ['counterString']
};

const config1 = {
  key: 'primary',
  storage
};

// Object of all the reducers for redux-persist
const reducer = {
  counterReducer,
  auth
};

// This will persist all the reducers, but I don't want to persist navigation state, so instead will use persistReducer.
// const rootReducer = persistCombineReducers(config, reducer)

// We are only persisting the counterReducer and loginRducer
const CounterReducer = persistReducer(config, counterReducer);
const authReducer = persistReducer(config1, auth);

// combineReducer applied on persisted(counterReducer) and NavigationReducer
const rootReducer = combineReducers({
  CounterReducer,
  nav: NavigationReducer,
  auth: authReducer,
  firebase: firebaseStateReducer,
  firestore: firestoreReducer
});

const reactNativeFirebaseConfig = {
  debug: true,
  enableRedirectHandling: false
};

const reduxFirebaseConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false
};

function configureStore(initialState = { firebase: {}, firestore: {} }) {
  const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);
  firebase.firestore();
  //Reducer Config
  // ===============

  // config to not persist the *counterString* of the CounterReducer's slice of the global state.

  //Middleware Configuration
  //=======================================
  const loggerMiddleware = createLogger({
    predicate: (getState, action) => __DEV__
  });

  const middleware = [
    thunkMiddleware.withExtraArgument(getFirebase),
    loggerMiddleware
  ];

  // =======================================
  // Store Enhancers
  // =======================================
  const enhancers = [];

  //Initialize Firebase and Firestore

  let store = createStore(
    rootReducer,
    initialState,
    compose(
      reactReduxFirebase(firebase, reduxFirebaseConfig),
      reduxFirestore(firebase),
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  let persistor = persistStore(store);
  return { persistor, store };
}

export default configureStore;
