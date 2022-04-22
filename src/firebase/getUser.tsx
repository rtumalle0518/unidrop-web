import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
export const getUser = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        const cleanUp = onAuthStateChanged(auth, (User) => {
            if (User) {
                setUser(User.uid);
            }
        })
        return cleanUp
    }, []);
    return user
}