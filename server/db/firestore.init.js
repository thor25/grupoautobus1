var firebase = require("firebase/app");
require ("firebase/firestore");
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
