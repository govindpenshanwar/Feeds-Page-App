import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token => ", token);

    if (!token) {
        return res.status(403).json({ success: false, message: 'Access denied: No token provided' });
    }


    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
        } else {
            const userRole = decoded.role;

            if (userRole !== 'admin') {
                return res.status(403).json({ success: false, message: 'Access denied: Not an admin' });
            }
            next();
        }
    });
};
export default isAdmin;

