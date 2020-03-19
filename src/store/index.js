import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import fbConfig from 'config/fbConfig';
const initialState = {}; // the initial value for your state

const store = createStore(
  rootReducer,
  initialState,

  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig), // redux bindings for firestore
  ),
);

export default store;
