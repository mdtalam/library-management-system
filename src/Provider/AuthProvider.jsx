import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    // create new user
    const createNewUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // user login
    const logInUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    // login user with google
    const googleLogin = () => {
        return signInWithPopup(auth,provider)
    }

    // logout user
    const logOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }

    // update profile
    const updateUserProfile = (updatedData) =>{
        return updateProfile(auth.currentUser, updatedData)
    }

    const authInfo = {
        user,
        setUser,
        createNewUser,
        logInUser,
        googleLogin,
        logOutUser,
        updateUserProfile,
        loading,

    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    },[])



    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;