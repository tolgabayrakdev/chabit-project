"use client"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        const verifyAuthToken = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/auth/me", {
                    method: 'POST',
                    credentials: 'include',
                });
                if (res.status === 200) {
                    setLoading(false);
                } else if (res.status === 401 || res.status === 403) {
                    setLoading(false);
                    setAccessDenied(true);
                } else {
                    setLoading(false);
                    setAccessDenied(true);
                }
            } catch (error) {
                setLoading(false);
                setAccessDenied(true);
            }
        };
        verifyAuthToken();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-black"></div>
                </div>
            </div>
        )
    } else if (accessDenied) {
        setLoading(true);
        setTimeout(() => {
            router.push('/login');
        }, 1000);
    }

    return <>{children}</>;
}

export default AuthProvider;