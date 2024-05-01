const jwt=require('jsonwebtoken')

// middleware function - token verification



exports.middlewareFunction=(req,res,next)=>{
    console.log("-----inside middileware-----");

    if (!req.headers['access_token']) {
        return res.status(401).json("Access token is missing");
    }
    // token
    try {

        const token=req.headers['access_token'].split(" ")[1] 
        // `Bearer ${token")`
        // verify
        const jwtResponse=jwt.verify(token,process.env.JWT_SECRET_KEY)


        // store the user id payload in request payload

        req.payload = jwtResponse.uid  
        next()
        
    } catch {

        res.status(401).json("authentication failed plaese login again")
        
    }
}