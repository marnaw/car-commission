import authReducer from './authReducer';
import ordersReducer from './ordersReducer';
import productsReducer from './productsReducer';
import invoicesReducer from './invoicesReducer';
import clientsReducer from './clientsReducer';
import employeesReducer from './employeesReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  products: productsReducer,
  invoices: invoicesReducer,
  clients: clientsReducer,
  employees: employeesReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
