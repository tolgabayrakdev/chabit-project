import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;

        if (token) {
            jwt.verify(
                token,
                process.env.JWT_SECRET_KEY || 'jwt-secret',
                (error, user) => {
                    if (error) {
                        return res.status(403).json({ message: 'Token is not valid!' });
                    }
                    req.user = user;
                    next();
                }
            );
        } else {
            res.status(401).json({ message: 'You are not authenticated!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
