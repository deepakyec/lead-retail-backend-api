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
    }
}