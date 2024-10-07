const jwt=require("jsonwebtoken");

// verification de valadité du token
function verifyToken(req,res,next){
        const token = req.headers.token;    
        if(token){
            try{
                const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
                req.user=decoded;
                next();

            }catch(error){
                res.status(401).json({ message: "no token provided"})
            }
        }else{
            res.status(401).json({ message: "no token provided"});
        }
}

// verfication du token et l'autorisaiton de l'utilisateur

function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id  || req.user.isAdmin){
           next();
        }else{
            return res.status(403).json({message :' you are not allowed'})
        }
    });
}

function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
          
           next();
        }else{
            console.log(req.user);
            return res.status(403).json({message:'you are not allowed only admin alllowed!'});
        }
    });
}



module.exports={
    verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin
}

