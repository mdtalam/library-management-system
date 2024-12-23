import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    console.log(user);

    // create new user
    const createNewUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // user login
    const logInUser = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    // logout user
    const logOutUser = () =>{
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
        logOutUser,
        updateUserProfile,

    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
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