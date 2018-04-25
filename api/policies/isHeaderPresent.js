module.exports = async function(req,res,next){
    var auth = req.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
    
    if(!auth) {     // No Authorization header was passed in so it's the first time the browser hit us

                // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
                // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

                res.forbidden();
        }

        else if(auth) {    // The Authorization was passed in so now we validate it

                var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

                var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
                var plain_auth = buf.toString();        // read it back out as a string

                
                // At this point plain_auth = "username:password"

                var creds = plain_auth.split(':');      // split on a ':'
                var username = creds[0];
                var password = creds[1];
                
                console.log('in headers',username,password);

                Businesses.findOne(
                   {
                        or : [
                            { phone: username },
                            { user_name: username }
                        ]                                               
                    }
                ).then(async (data) => {                   
                    if(data != null)
                    {
                        let result = await UtilityService.comparePassword(password,data.password_digest)                       
                        if(result)
                        {
                            next();
                        }
                        else
                        {
                            res.statusCode = 401; // Force them to retry authentication
                            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
                            res.badRequest('Invalid Username & Password Provided');
                        }
                        
                    }
                    else
                    {
                        res.statusCode = 401; // Force them to retry authentication
                        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
                        res.badRequest('Invalid Username & Password Provided');
                    }
                                                           
                }).catch(err => {
                
                    res.statusCode = 401; // Force them to retry authentication
                    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
                    res.badRequest('Invalid Username & Password Provided');
                });                
        }
}