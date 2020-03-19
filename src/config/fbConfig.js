import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAdsnD35LXAyV4gGz7Di1pM86KObhzf8S4',
  authDomain: 'shopcar-22510.firebaseapp.com',
  databaseURL: 'https://shopcar-22510.firebaseio.com',
  projectId: 'shopcar-22510',
  storageBucket: 'shopcar-22510.appspot.com',
  messagingSenderId: '986250231946',
  appId: '1:986250231946:web:700677b88ea5f4e9e42d73',
  measurementId: 'G-MBXW6P6G9K',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
