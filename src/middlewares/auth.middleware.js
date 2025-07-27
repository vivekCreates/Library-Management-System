import jwt from "jsonwebtoken";

const authMiddleWare = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.status(401).json({message:"Unauthorized access, please login first."});
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded; 
        next() 
    } catch (error) {
        console.error("Auth middleware error: ",error)
    }
}

export default authMiddleWare;