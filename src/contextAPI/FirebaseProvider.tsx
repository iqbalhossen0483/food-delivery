import React, { createContext } from 'react'
import useFirebase, { Hook } from '../firebase/useFirebase';


export const AuthContex = createContext<Hook | null>(null);

const FirebaseProvider:React.FC = ({ children }) => {
    const auth = useFirebase();
    return (
        <AuthContex.Provider value={auth}>
            {children}
        </AuthContex.Provider>
    );
}

export default FirebaseProvider