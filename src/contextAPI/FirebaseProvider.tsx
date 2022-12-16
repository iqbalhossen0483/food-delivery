import React, { createContext } from "react";
import { FirebaseShema } from "../../firebase";
import Firebase from "../firebase/Firebase";

export const AuthContex = createContext<FirebaseShema | null>(null);

const FirebaseProvider: React.FC = ({ children }) => {
  const auth = Firebase();
  return <AuthContex.Provider value={auth}>{children}</AuthContex.Provider>;
};

export default FirebaseProvider;
