import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig={
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export var auth;
export var firestore ;
var storage ;

export async function firebaseInit()
{
  console.log("🚀 ~ file: firebase.js ~ line 22 ~ firebase.apps.length", firebase.apps.length)

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

  auth = firebase.auth();
  firestore = firebase.firestore();
  storage = firebase.storage();
}
// export const performance = firebase.performance();

// export let analytics;

// if (process.env.NODE_ENV !== "test") {
//   analytics = firebase.analytics();
// }
