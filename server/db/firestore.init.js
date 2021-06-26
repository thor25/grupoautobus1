var firebase =  require("firebase/app");
 require("firebase/firestore");
 require("firebase/auth");
 require ("firebase/analytics");



exports.firestore = () => firebase.firestore();
var auth; 


exports.firebaseInit = ()=> {
  try {
    var config = {
      apiKey: "AIzaSyBFwlVDLGxpIX_i8ChQd0cKiL5m-bFlyug",
      authDomain: "grupoautobus-e87e3.firebaseapp.com",
      databaseURL: "https://grupoautobus-e87e3-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "grupoautobus-e87e3",
      storageBucket: "grupoautobus-e87e3.appspot.com",
      messagingSenderId: "673256947330",
      appId: "1:673256947330:web:352d247bb0f8145e253e9b",
      measurementId: "G-ED482GRJH8"
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
  var firestore = firebase.firestore()
  auth  = firebase.auth()
console.log("🚀 ~ file: firestore.init.js ~ line 172 ~ password", password)
console.log("🚀 ~ file: firestore.init.js ~ line 172 ~ emailAddress", emailAddress)
  return new Promise((resolve, reject) => {
     
    if (!emailAddress || !password) {
      console.log("🚀 ~ file: firestore.init.js ~ line 176 ~ reject ~ password", password)
      reject(new Error("No e-mail address or password"));

      return;
    }
    console.log(auth)

    if (auth.currentUser) {
      console.log("🚀 ~ file: firestore.init.js ~ line 182 ~ returnnewPromise ~ auth", auth)
      reject(new Error("No current user"));

      return;
    }

    auth
      .signInWithEmailAndPassword(emailAddress, password)
      .then((value) => {
        const user = value.user;
        console.log("🚀 ~ file: firestore.init.js ~ line 192 ~ .then ~ user", user)

        if (!user) {
          reject(new Error("No user"));

          return;
        }

        const uid = user.uid;
        console.log("🚀 ~ file: firestore.init.js ~ line 205 ~ .then ~ uid", uid)

        if (!uid) {
          reject(new Error("No UID"));

          return;
        }

        const userDocumentReference = firestore.collection("users").doc(uid);
        console.log("🚀 ~ file: firestore.init.js ~ line 214 ~ .then ~ userDocumentReference", userDocumentReference)

        
      })
      .catch((reason) => {
      console.log("🚀 ~ file: firestore.init.js ~ line 245 ~ returnnewPromise ~ reason", reason)
        
        reject(reason);
      });
  });
    console.log("🚀 ~ file: firestore.init.js ~ line 123 ~ returnnewPromise ~ auth", auth)
};
exports.authentication = authentication;
