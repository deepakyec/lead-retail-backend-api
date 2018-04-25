module.exports = async function(req,res,next){
    
    
    // if(!req.headers || !req.headers.authorization){
    //     return res.badRequest({err:'autorization header is missing'});
    // }

    // const tokenParam = req.headers.authorization;
    // //decode tokenParam
    // //extract user from the decoded tokenParam
    // //check for the user exist
   
    // if(!user){
    //     return next({err:'unauthorized'});
    // }
    // req.user = user.id;
    next();
}