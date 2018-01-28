import * as firebase from 'firebase';
let database;

export const init = () => {
  let config = {
    apiKey: "AIzaSyCAA_1GV2gy4hG7pRJIFsWn6VLx5-tRfHc",
    authDomain: "booking-app-88db1.firebaseapp.com",
    databaseURL: "https://booking-app-88db1.firebaseio.com",
		projectId: "booking-app-88db1",
    storageBucket: "",
    messagingSenderId: "431906436671"
  }
  firebase.initializeApp(config);
  database = firebase.database();
}
