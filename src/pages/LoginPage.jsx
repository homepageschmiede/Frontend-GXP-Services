import { useState, useContext } from "react";
import MenueComponent from "../components/MenueComponent"
import toast from "react-hot-toast";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router";
import api from "../api/axios.js"

const LoginPage = () => {

    const { setAuth } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await api.post(
            "/auth/login",
            { withCredentials: true }

        );

        const accessToken = res?.data?.token;

        if (accessToken) {
            setAuth({
                user: "rene",
                accessToken,
            });

            navigate("/dashboard");
        } else {
            // optional: Auth-Status zurücksetzen
            setAuth(null);
        }



    }

    return (
        <>
            <MenueComponent />

            <div className="flex justify-center items-center min-h-screen">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
                    <legend className="fieldset-legend">Login</legend>

                    <form onSubmit={handleSubmit}>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input w-full"

                            placeholder="Email" />

                        <label className="label mt-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input w-full"

                            placeholder="Password" />

                        <button className="btn btn-primary mt-4 w-full">Login</button>
                    </form>

                </fieldset>
            </div>
        </>
    )
}

export default LoginPage
