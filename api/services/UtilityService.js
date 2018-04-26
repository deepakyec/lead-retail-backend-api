var PhoneNumber = require( 'awesome-phonenumber' );
const bcrypt = require('bcrypt');
const SALT_ROUND = 10;
const sha256 = require('sha256');

module.exports = {
    async generateOTP(){
      return await  String(Math.floor(100000 + Math.random() * 900000)).substring(0,6);
    },
    async normalize_phone(phone,locale){
        let result = /^\+/.test(phone);
        console.log("locale=>",locale); 
        let loc  = locale!=undefined?locale.split('-')[1]:'';
        
        if(result){
            var pn = new PhoneNumber(phone).getNumber( 'e164' );
            return pn;
        }else if(phone && new PhoneNumber(phone,loc)){
            var pn = new PhoneNumber(phone,loc).getNumber( 'e164' );
            return pn;
        }else{
            return phone;
        }
        
    },
    async generateRandomString(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 6; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        }     
        return text;
    },
    async hashPassword(password){
        return await bcrypt.hash(password,SALT_ROUND);
    },
    async comparePassword(password,hash){
        return await bcrypt.compare(password,hash);
    },
    async getUserIdFromHeaders(req){
        var auth = req.headers['authorization'];
        var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

        var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
        var plain_auth = buf.toString();        // read it back out as a string

        
        // At this point plain_auth = "username:password"
        
        var creds = plain_auth.split(':');      // split on a ':'
        var username = creds[0];
        var password = creds[1];
        
        let result = await Businesses.findOne({
                        where : {
                         user_name : username
                         },
                         //select: ['id']
                    });
                    
        return result
    },
    async formatToISODate(date)
    {
        try
        {
            console.log(date);
            let dt = new Date(date);    
            let dd = dt.getDate();
            let mm = dt.getMonth()+1; 
            let yyyy = dt.getFullYear();
            if(dd<10){
              dd='0'+dd;
              } 
            if(mm<10){
                mm='0'+mm;
              } 
            return yyyy+'-'+mm+'-'+ dd;
        }
        catch(err)
        {
            return "";
        }
    },
    // async query(model, sql, values) {
    //     values = values || [];
    //     console.log('inside query method');
    //     return new Promise((resolve, reject) => {
      
    //       model.query(sql, values, (err, results) => {
    //         if (err) {
    //           return reject(err);
    //         }
    //         console.log(results);
    //         resolve(results);
    //       });
    //     });
    //   }
}