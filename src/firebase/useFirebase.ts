import firebaseInit from '../firebase/firebaseInit';
import { useEffect, useState } from 'react';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    User,
    getIdToken
} from "firebase/auth";

firebaseInit();


export interface Hook {
    loginWithGoogle: () => void,
    singUpWithEmail: (email: string, password: string, name: string) => void,
    loginWithEmail: (email:string, password:string) => void,
    logOUt: () => void,
    user: User | null,
    loading: boolean,
    login: boolean,
    userFromDb: UserFromDb | null,
    update: boolean,
    setUpdate: (action: boolean) => void;
}

interface UserFromDb{
    role: string,
    cart: string[]
}

const useFirebase: () => Hook = () => {
    const [userFromDb, setUserFromDb] = useState<UserFromDb | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [update, setUpdate] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [login, setLogin] = useState<boolean>(false);
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    //log in with google
    function loginWithGoogle() {
        setLogin(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                makeUser(result.user, "google");
            })
            .catch(err => {
                console.log(err);
            })
    };

    //sing up with email
    function singUpWithEmail(email: string, password: string, name: string) {
        setLogin(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                addUserName(name, result.user);
            })
            .catch(err => {
                console.log(err);
                setLogin(false);
            })
    };

    //addUser name
    function addUserName(name: string, user:User) {
        if (auth.currentUser) {
            updateProfile(auth.currentUser, {
                displayName: name
            })
                .then(() => {
                    makeUser(user, "email");
                })
                .catch(err => {
                    console.log(err);
                    setLogin(false);
                })
        };
    };

    //sing in with email
    function loginWithEmail(email: string, password: string) {
        setLogin(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setLogin(false);
            })
            .catch(err => {
                console.log(err);
                setLogin(false);
            })
    }

    // sing out
    function logOUt() {
        signOut(auth)
            .then(() => setUser(null))
            .catch(err=>console.log(err))
    }

    //make user to database
    function makeUser(user: User, type:string) {
        const { email, displayName, photoURL } = user;
        let data = {};
        if (photoURL) {
            data = { email, displayName, photoURL, role: "user", type };
        }
        else {
            data = { email, displayName, role: "user", type };
        }

        fetch(`https://fooddelivery-server.herokuapp.com/users/${user.email}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setLogin(false);
            })
            .catch(err=> setLogin(false))
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        localStorage.setItem("idToken", `Bearer ${idToken}`);
                    })
            }
            else setUser(null);
            setLoading(false);
        })
    }, []);

    //getUser from db
    function getUserFromDb(id: string) {
        const idToken: string = localStorage.getItem("idToken") || "";
        const email: string = id || "";
        fetch(`https://fooddelivery-server.herokuapp.com/users/${email}`,{
                headers: {
                    "authorize": idToken,
                    "email": email
                }
            })
            .then(res => res.json())
            .then(data => {
                setUserFromDb(data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(() => {
        if (user?.email) {
            getUserFromDb(user.email);
        }
    }, [update, user]);
    
    
    return {
        loginWithGoogle,
        singUpWithEmail,
        loginWithEmail,
        user,
        loading,
        logOUt,
        login,
        userFromDb,
        update,
        setUpdate
    }
};

export default useFirebase