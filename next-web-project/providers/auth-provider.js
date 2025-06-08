"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AuthProvider({ children }) {
    const router = useRouter();
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
                } else {
                    setAccessDenied(true);
                    setLoading(false);
                }
            } catch (error) {
                setAccessDenied(true);
                setLoading(false);
            }
        };

        verifyAuthToken();
    }, []);

    useEffect(() => {
        if (accessDenied && !loading) {
            router.push('/login');
        }
    }, [accessDenied, loading, router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-black"></div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default AuthProvider;
