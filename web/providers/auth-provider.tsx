"use client"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Loading from '../components/loading';

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        const verifyAuthToken = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/auth/me`, {
                    method: 'GET',
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
            <Loading />
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