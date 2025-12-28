import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

export default function AdminAuth({children}: { children: ReactNode }) {
    const navigate = useNavigate();
    const isAdmin = useAdmin();

    useEffect(() => {
        if (!isAdmin) {
            navigate(`/404`);
        }
    }, [isAdmin, navigate]);

    return children;
}
