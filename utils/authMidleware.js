const jwt =require('jsonwebtoken')

const authMidleware=((req, res, next)=>{
    let headers = req.headers('token-key')    
});

module.exports = authMidleware;