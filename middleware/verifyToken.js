import { verify } from "crypto";
import { jwt } from "jsonwebtoken";

const verifyToken = (req , res , next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        res.status(404).json({error:"A token is required for authorization"})
    }
    try {
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded ;//attaching the decode token with the request object 
    } catch (error) {
        return res.status(101).json({error : "Invalid Token"})
    }
    return next();
}

export default verifyToken ;