const services = require('../services')

function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'No tienes autorizacion'})
    }

    const token = req.headers.authorization.split(" ")[1]
    
    asyncDecode();

    next();
}

async function asyncDecode(){
    try{
        const response = await services.decodeToken(token)
        req.user = response;
        next()
    }catch(e){
        res.status(401).send('El token ha expirado')
    }
}

module.exports = isAuth;