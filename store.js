import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import authReducer from './src/Reducers/authReducer';
import NavigationReducer from './src/Reducers/navigationReducer';
import activeCompanyReducer from './src/Reducers/activeCompanyReducer';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import RNFirebase from 'react-native-firebase';

import {
  reactReduxFirebase,
  firebaseStateReducer,
  getFirebase
} from 'react-redux-firebase';

import {
  getFirestore,
  reduxFirestore,
  firestoreReducer
} from 'redux-firestore';

import { reactNavigationMiddleware } from './src/Navigation';

const persistConfig = {
  key: 'root',
  storage
};

const persistedActiveCompanyReducer = persistReducer(
  persistConfig,
  activeCompanyReducer
);

const rootReducer = combineReducers({
  auth: authReducer,
  activeCompany: persistedActiveCompanyReducer,
  nav: NavigationReducer,
  firebase: firebaseStateReducer,
  firestore: firestoreReducer
});

const reactNativeFirebaseConfig = {
  debug: true
};

const reduxFirebaseConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
  profileFactory: (userData, profileData) => {
    // how profiles are stored in database
    console.log('setting profile');
    console.log('userData', userData);
    console.log('profileData', profileData);
    return {
      email: profileData.email,
      username: profileData.username,
      companies: { [profileData.companyId]: true }
    };
  }
};

function configureStore(initialState = { firebase: {}, firestore: {} }) {
  const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);
  firebase.firestore();

  const loggerMiddleware = createLogger({
    predicate: (getState, action) => __DEV__
  });

  const middleware = [
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
    loggerMiddleware,
    reactNavigationMiddleware
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
      applyMiddleware(...middleware),
      reduxFirestore(firebase),
      ...enhancers
    )
  );

  let persistor = persistStore(store);
  return { persistor, store };
}

export default configureStore;
