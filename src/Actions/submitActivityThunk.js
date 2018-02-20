import { NavigationActions } from 'react-navigation';

export const submitActivity = activity => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const currentState = getState();
    const firestore = getFirestore();
    const { activeCompany } = currentState.activeCompany;
    const { uid } = currentState.auth;

    console.log(activity);
  };
};
