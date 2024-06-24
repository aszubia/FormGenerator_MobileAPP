import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAlR10_WYWAfYzlKha_kmem5cpbgqkRWbg",
    authDomain: "our-form-generator.firebaseapp.com",
    projectId: "our-form-generator",
    storageBucket: "our-form-generator.appspot.com",
    messagingSenderId: "32678761428",
    appId: "1:32678761428:web:3d8c57cb4ba50716c57c41",
    databaseURL: "our-form-generator.firebaseio.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
