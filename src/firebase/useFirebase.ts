import firebaseInit from "../firebase/firebaseInit";
import { useEffect, useState } from "react";
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
  getIdToken,
} from "firebase/auth";

firebaseInit();

interface Result {
  user: User;
}

export interface Hook {
  loginWithGoogle: () => Promise<Result>;
  singUpWithEmail: (
    email: string,
    password: string,
    name: string
  ) => Promise<Result>;
  loginWithEmail: (email: string, password: string) => Promise<Result>;
  logOUt: () => void;
  user: User | null;
  loading: boolean;
  userFromDb: UserFromDb | null;
  addUserName: (name: string) => void;
  getUserFromDb: (email: string | null) => void;
}

interface UserFromDb {
  role: string;
  cart: string[];
}

const useFirebase: () => Hook = () => {
  const [userFromDb, setUserFromDb] = useState<UserFromDb | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  //log in with google
  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  //sing up with email
  function singUpWithEmail(email: string, password: string, name: string) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //addUser name
  function addUserName(name: string) {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //sing in with email
  function loginWithEmail(email: string, password: string) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // sing out
  function logOUt() {
    signOut(auth)
      .then(() => {
        setUser(null);
        setUserFromDb(null);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          localStorage.setItem("idToken", `Bearer ${idToken}`);
          makeUser(user);
        });
      } else setUser(null);
      setLoading(false);
    });
  }, []);

  //make user to database
  function makeUser(user: User) {
    if (!user.email) return;

    const { email, displayName, photoURL } = user;
    let data = {};
    if (photoURL) {
      data = { email, displayName, photoURL, role: "user" };
    } else {
      data = { email, displayName, role: "user" };
    }

    fetch(
      `https://myserver-production-ddf8.up.railway.app/food/users/${user.email}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        getUserFromDb(user.email);
      })
      .catch((err) => {});
  }

  //getUser from db
  function getUserFromDb(Email: string | null) {
    const idToken: string = localStorage.getItem("idToken") || "";
    const email: string = Email || "";
    fetch(
      `https://myserver-production-ddf8.up.railway.app/food/users/${email}`,
      {
        headers: {
          authorize: idToken,
          email: email,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserFromDb(data);
        }
      })
      .catch((err) => console.log(err));
  }

  return {
    loginWithGoogle,
    singUpWithEmail,
    loginWithEmail,
    user,
    loading,
    logOUt,
    userFromDb,
    addUserName,
    getUserFromDb,
  };
};

export default useFirebase;
