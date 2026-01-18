import { createContext, useState, useEffect } from "react";
import api, { setAxiosAuthToken } from "../api/axios.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadMe = async () => {
            try {
                const res = await api.get(
                    "/auth/me",
                    { withCredentials: true }
                );

                const accessToken = res?.data?.token;

                if (accessToken) {
                    setAuth({
                        user: "rene",
                        accessToken,
                    });

                    // 🔐 Axios bekommt den Token
                    setAxiosAuthToken(accessToken);

                } else {
                    // optional: Auth-Status zurücksetzen
                    //setAuth(null);
                    //setAxiosAuthToken(null);
                }

            } catch (err) {
                // Token ungültig / nicht vorhanden / 401
                console.log("me failed, keeping auth");
                //setAuth(null);
            } finally {
                setLoading(false);
            }
        };

        // 🔥 WICHTIG
        if (!auth?.accessToken) {
            loadMe();
        } else {
            setLoading(false);
        }

    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }} >
            {children}
        </AuthContext.Provider>

    )
}

export default AuthContext;