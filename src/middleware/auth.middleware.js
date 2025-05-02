import jwt from "jsonwebtoken";
//import user from "../models/User.js"
import User from "../models/User.js";



const protectRoute = async (req, res, next) => {
    try {
        //get token
        const token = req.header("Authorization").replace("Bearer ", "")
        if (!token) return res.status(401).json({ message: "No authorization Token, access denied" });

        //veriy token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //find user
        const user = await User.findById(decode.userId).select("-password");
        if(!user) return res.status(401).json({ message: "Token is not valid" });
        req.user = user;
        next();

    } catch (error) {
        console.log("Authentication error", error.message);
        res.status(401).json({ message: "Token is not valid" });
    }
}

export default protectRoute