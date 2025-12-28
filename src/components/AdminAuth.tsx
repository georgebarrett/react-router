import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Spinner from "./Spinner";

export default function AdminAuth({children}: { children: ReactNode }) {
    const navigate = useNavigate();
    const isAdmin = useAdmin();

    useEffect(() => {
        if (isAdmin === false) {
            navigate(`/404`);
        }
    }, [isAdmin, navigate]);

    if (isAdmin === null) return <Spinner />;

    return children;
}
