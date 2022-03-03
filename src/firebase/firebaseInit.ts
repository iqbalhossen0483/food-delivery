import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.confiq";

const firebaseInit = () => {
    return initializeApp(firebaseConfig);
}

export default firebaseInit;