import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../components/loading';

interface WithAuthProps {
    children?: React.ReactNode
}
function AuthWrapper<P extends WithAuthProps>(WrappedComponent: ComponentType<P>) {
    const Wrapper = (props: P) => {
        const [loading, setLoading] = useState(true);
        const [accessDenied, setAccessDenied] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            const verifyAuthToken = async () => {
                try {
                    const res = await fetch("http://localhost:1234/api/v1/auth/me", {
                        method: 'POST',
                        credentials: 'include',
                    });

                    if (res.status === 200) {
                        setLoading(false);
                        setAccessDenied(false);
                    } else {
                        setLoading(false);
                        setAccessDenied(true);
                    }
                } catch (error) {
                    setLoading(false);
                    setAccessDenied(true);
                    throw error;
                }
            };
            verifyAuthToken();
        }, []);

        useEffect(() => {
            if (accessDenied && !loading) {
                navigate('/login');
            }
        }, [accessDenied, loading, navigate]);

        if (loading) {
            return <Loading />;
        }

        if (accessDenied) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
}

export default AuthWrapper;