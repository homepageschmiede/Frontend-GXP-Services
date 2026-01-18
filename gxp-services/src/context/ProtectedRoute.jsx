import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../context/AuthProvider";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Authentifizierung läuft…</div>;
    }

    if (!auth?.accessToken) {
        toast.error("Nicht angemeldet");
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
