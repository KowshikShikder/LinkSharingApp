// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCRmpSDwhKbmF8tYrGaPvrGjrfJQZt-EW0",
//   authDomain: "linksharingapp-bdacb.firebaseapp.com",
//   projectId: "linksharingapp-bdacb",
//   storageBucket: "linksharingapp-bdacb.appspot.com",
//   messagingSenderId: "414012169459",
//   appId: "1:414012169459:web:8a4fb0de63ab2176e7ab86",
//   measurementId: "G-DW3D8JBN17"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);








import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyCRmpSDwhKbmF8tYrGaPvrGjrfJQZt-EW0",
//   authDomain: "linksharingapp-bdacb.firebaseapp.com",
//   projectId: "linksharingapp-bdacb",
//   storageBucket: "linksharingapp-bdacb.appspot.com",
//   messagingSenderId: "414012169459",
//   appId: "1:414012169459:web:8a4fb0de63ab2176e7ab86",
//   measurementId: "G-DW3D8JBN17"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCKNfn_bKgAISOY6LJMzByN2rYIvJncahI",
//   authDomain: "chatapp-335ed.firebaseapp.com",
//   databaseURL:"https://chatapp-335ed-default-rtdb.firebaseio.com",
//   projectId: "chatapp-335ed",
//   storageBucket: "chatapp-335ed.appspot.com",
//   messagingSenderId: "226295287191",
//   appId: "1:226295287191:web:f0fa7a7ebcaceaec8648d2"
// };


const firebaseConfig = {
  apiKey: "AIzaSyBuWY5WAWLeIoQOzU77qyIckQKLC_2Qqaw",
  authDomain: "linksharingapp-de794.firebaseapp.com",
  projectId: "linksharingapp-de794",
  storageBucket: "linksharingapp-de794.appspot.com",
  messagingSenderId: "1047260378648",
  appId: "1:1047260378648:web:3798171eadd56fd6c9b56d",
  measurementId: "G-5F4FQWJ1P1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()







