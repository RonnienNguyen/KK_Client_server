import firebase from "firebase/app";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAw_HBNjF-W55q_a7FmSXhjz7toyBju1E",
  authDomain: "upload-images-86f02.firebaseapp.com",
  projectId: "upload-images-86f02",
  storageBucket: "upload-images-86f02.appspot.com",
  messagingSenderId: "983522188603",
  appId: "1:983522188603:web:06fb398456db5407a86b1e",
  measurementId: "G-306THKW03Q",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
