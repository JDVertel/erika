
/*  */

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6b6ESvmM7oX6FE-KChGl5fXMJ3kGwly0",
  authDomain: "fisioapp-f10cc.firebaseapp.com",
  databaseURL: "https://fisioapp-f10cc-default-rtdb.firebaseio.com",
  projectId: "fisioapp-f10cc",
  storageBucket: "fisioapp-f10cc.appspot.com",
  messagingSenderId: "369970954516",
  appId: "1:369970954516:web:e98f614af0182737efc201"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
