
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebaseApp } from '../screens/Login';

const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp); 
const storage = storageRef(firebaseApp);
const user = auth.currentUser;

if (user) {
    const itemRef = ref(database, `Forms/Form1/Requester: ${user.displayName}/link`);
};

export default [
    {
        id:"0",
        image:"https://images.pexels.com/photos/8815843/pexels-photo-8815843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        name:"Form 5",
        link: "",
        rating:4.4,
        time:"30-40",
        adress:"Residency Road, Ashok Nagar",
        ratings:"1k",
        cost_for_two:500,
        cuisines:"north Indian, South Indian",
    },
    {
        id:"1",
        image:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/lvxyt7qdchtmzh8telc2",
        name:"Beijing Bites",
        rating:4.2,
        time:"30-40",
        adress:"Richmond Town, Ashok Nagar ",
        ratings:"500",
        cost_for_two:450,
        cuisines:"north Indian, South Indian"

    },
    {
        id:"2",
        image:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/pbtwdcg4rcktb89hrxbc",
        name:"Behrouz Biriyani",
        rating:4.3,
        time:"45-50",
        adress:"Residency Road, Shantinagar",
        ratings:"100",
        cost_for_two:430,
        cuisines:"north Indian, South Indian"

    }
]