import firebaseInit from "./firebaseInit";
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
} from "firebase/auth";
import { FirebaseShema } from "../../firebase";
import { DbUser } from "../../common";

firebaseInit();

const Firebase: () => FirebaseShema = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<DbUser | null>(null);
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
  async function addUserName(user: User, name: string) {
    try {
      await updateProfile(user, {
        displayName: name,
      });
    } catch (error: any) {
      Error(error.message);
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
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserFromDb(user.email!);
      } else setUser(null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //make user to database
  async function makeUser(user: User) {
    try {
      const { email, displayName, photoURL } = user;
      let data = {};
      if (photoURL) {
        data = { email, displayName, photoURL, role: "user" };
      } else {
        data = { email, displayName, role: "user" };
      }

      const res = await fetch(
        `https://myserver-production-ddf8.up.railway.app/food/users/${user.email}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      if (res.ok) {
        getUserFromDb(user.email!);
      } else Error(result.message);
    } catch (error: any) {
      Error(error.message);
    }
  }

  //getUser from db
  async function getUserFromDb(email: string) {
    try {
      const res = await fetch(
        `https://myserver-production-ddf8.up.railway.app/food/users/${email}`
      );
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else Error(data.message);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    loginWithGoogle,
    singUpWithEmail,
    loginWithEmail,
    user,
    loading,
    logOUt,
    addUserName,
    getUserFromDb,
    makeUser,
  };
};

export default Firebase;
