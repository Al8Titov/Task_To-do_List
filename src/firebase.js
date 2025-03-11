


import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, remove, update, push } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCasEPGF34MuHJDoSAf1F69a2MEKlQZ7dE",
  authDomain: "todolistapp-c9c2b.firebaseapp.com",
  databaseURL: "https://todolistapp-c9c2b-default-rtdb.firebaseio.com",
  projectId: "todolistapp-c9c2b",
  storageBucket: "todolistapp-c9c2b.firebasestorage.app",
  messagingSenderId: "693570932688",
  appId: "1:693570932688:web:9c20f8a32ceb00268733d5"
};


const app = initializeApp(firebaseConfig);


const database = getDatabase(app);


export { database, ref, set, get, child, remove, update, push };
