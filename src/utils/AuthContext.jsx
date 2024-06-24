import { createContext, useState, useEffect, Children, useContext } from "react";
import { account } from "../appriteConfig";
const AuthContext = createContext()
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, [])


    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        try {
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password)
            console.log("Logged in ", response);
            const accountDetails = account.get();
            setUser(accountDetails)
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    
    const contextData = {
        user,
        handleUserLogin
     }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading</p> : children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;
