import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router';
import api, { setAxiosAuthToken } from "../api/axios.js";
import AuthContext from "../context/AuthProvider";


const LoginToken = () => {

    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (!token) {
            navigate('/login');
            return;
        }
        console.log("Token received:", token);

        const fetchData = async () => {
            try {
                const res = await api.post(
                    "/auth/wordpress/exchange",
                    { token: token },
                    { withCredentials: true }
                );

                console.log("Response from token exchange:", res.data);
                const accessToken = res?.data?.token;

                if (!accessToken) {
                    navigate('/login');
                    return;
                }

                setAuth({
                    user: "rene",
                    accessToken,
                });

                setAxiosAuthToken(accessToken);

                console.log("LoginToken: Erfolgreich eingeloggt, weiterleiten zu", res.data.context);

                navigate('/' + res.data.context);
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        }

        fetchData();
    })

    return (
        <div>
            <p>Logging in...</p>
        </div>
    );
}
export default LoginToken
