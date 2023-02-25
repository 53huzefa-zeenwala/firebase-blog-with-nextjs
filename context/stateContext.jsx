import { auth } from "@/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [alert, setAlert] = useState({ isShow: false, duration: 3000, message: "", type: "" })
    const [pageLoading, setPageLoading] = useState(true)
    const [user, setUser] = useState()

    const signInUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setAlert({ isShow: true, duration: 3000, message: "Successfully logged in", type: "success" })
        } catch (error) {
            console.log(error)
            setAlert({ isShow: true, duration: 3000, message: error.response?.data?.message || error.message, type: "error" })
        }
    }
    const logout = () => {
        return signOut(auth);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setPageLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <StateContext.Provider value={{
            alert,
            setAlert,
            user,
            pageLoading,
            signInUser,
            logout
        }}>
            {children}
        </StateContext.Provider>
    )
}
