import jasonWebToken from 'jsonwebtoken';

export default function(req,res,next) {
    //console.log(req.cookies)
    const token =  req.cookies.token;
    if(!token){ return res.status(401).send("Access Denied!");}
    try {
        const verified = jasonWebToken.verify(token,process.env['TOKEN_SECRET']);
        req.user = verified;
        next();
    } catch (err){
        res.status(400).send("Invalid Token!");
    }
}