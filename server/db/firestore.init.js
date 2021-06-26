var firebase =  require("firebase/app");
 require("firebase/firestore");
 require("firebase/auth");
 require ("firebase/analytics");



exports.firestore = () => firebase.firestore();
var auth; 


exports.firebaseInit = ()=> {
  try {
    var config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };
    firebase.initializeApp(config);
 
  } catch (err) {
    // we skip the "already exists" message which is    
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
  return firebase;
}
var moment = require('moment');

const authentication = {};


authentication.signIn = (emailAddress, password) => {
console.log("🚀 ~ file: firestore.init.js ~ line 41 ~ password", password)
console.log("🚀 ~ file: firestore.init.js ~ line 41 ~ emailAddress", emailAddress)
  var firestore = firebase.firestore()
  auth  = firebase.auth()
  return new Promise((resolve, reject) => {
     
    if (!emailAddress || !password) {
      reject(new Error("No e-mail address or password"));

      return;
    }
    console.log(auth)

    if (auth.currentUser) {
      reject(new Error("No current user"));

      return;
    }

    auth
      .signInWithEmailAndPassword(emailAddress, password)
      .then((value) => {
        const user = value.user;

        if (!user) {
          reject(new Error("No user"));

          return;
        }

        const uid = user.uid;

        if (!uid) {
          reject(new Error("No UID"));

          return;
        }

        const userDocumentReference = firestore.collection("users").doc(uid);

        
      })
      .catch((reason) => {
        
        reject(reason);
      });
  });
};
exports.authentication = authentication;
