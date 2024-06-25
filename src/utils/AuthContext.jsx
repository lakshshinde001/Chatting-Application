import { createContext, useState, useEffect, Children, useContext } from "react";
import { account } from "../appriteConfig";
const AuthContext = createContext()
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserOnLoad();
    }, [])

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
            // console.log("User Details : ", accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        try {
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password)
            console.log("Logged in ", response);
            const accountDetails = await account.get();
            setUser(accountDetails)
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    const handleUserLogout = async () => {
        await account.deleteSession('current');
        setUser(null);
    }
    
    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout
     }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading</p> : children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;
