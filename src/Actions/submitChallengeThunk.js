import activeCompanyActions from './companyActionCreator';
import { NavigationActions } from 'react-navigation';

export const submitChallenge = challenge => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const currentState = getState();
    const firestore = getFirestore();
    const { activeCompany } = currentState.activeCompany;
    const { uid } = currentState.auth;

    if (!activeCompany) {
      console.log('no active company on challenge submit');
      return new Error('no active company');
    }

    if (!uid) {
      console.log('no UID on challenge submit');
      return new Error('no UID on challenge submit');
    }

    if (!!activeCompany && !!uid) {
      const challengeToSubmit = {
        ...challenge,
        createdBy: uid,
        companyId: activeCompany,
        participants: { [uid]: true }
      };

      firestore.add('challenges', challengeToSubmit).then(response => {
        console.log(response);
        const id = response._documentPath._parts[1];
        dispatch(
          NavigationActions.navigate({
            routeName: 'ChallengeDetail',
            params: { id }
          })
        );
      });
    }
  };
};
