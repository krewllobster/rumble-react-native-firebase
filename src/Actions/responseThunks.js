export const addResponseThunk = (activityId, response) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const currentState = getState();
    const firestore = getFirestore();
    console.log(activityId, response);
    const path = `activities/${activityId}/responses`;
    console.log(path);
    firestore
      .add(
        {
          collection: path
        },
        response
      )
      .then(res => console.log(res));
  };
};

export const removeResponseThunk = (activityId, response) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const currentState = getState();
    const firestore = getFirestore();
    console.log('removing response');
    console.log(response);
    const path = `activities/${activityId}/responses`;
    const doc = response.id;
    const res = await firestore.deleteRef({
      collection: path,
      doc
    });
    console.log(res);
  };
};
