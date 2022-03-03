import React, { useContext } from 'react'
import { AuthContex } from '../contextAPI/FirebaseProvider'
import { Hook } from '../firebase/useFirebase';

const useAuth: () => Hook | null = () => {
    return useContext(AuthContex);
}

export default useAuth