import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
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

    // logout user
    const logOutUser = () =>{
        return signOut(auth);
    }

    const authInfo = {
        user,
        setUser,
        createNewUser,
        logOutUser,

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