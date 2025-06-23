import jwt from 'jsonwebtoken';
const SECRET = 'mysecretkey'

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.redirect('/login');
    jwt.verify(token, SECRET, (err, decoded)=>{
        if(err) return res.redirect('/login');
        req.user = decoded;
        next();
    });
} 

export default authMiddleware;