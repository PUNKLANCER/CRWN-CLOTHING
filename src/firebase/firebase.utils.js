import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';

const config = {
    apiKey: "AIzaSyCfIkRfpDIDjNDZ-Hgas6WsqQU-NxmRPOo",
    authDomain: "crwn-db-8d7cf.firebaseapp.com",
    databaseURL: "https://crwn-db-8d7cf.firebaseio.com",
    projectId: "crwn-db-8d7cf",
    storageBucket: "crwn-db-8d7cf.appspot.com",
    messagingSenderId: "685113297110",
    appId: "1:685113297110:web:27219a8e9ad913ddcba177",
    measurementId: "G-3BSHJ54ZC5"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;