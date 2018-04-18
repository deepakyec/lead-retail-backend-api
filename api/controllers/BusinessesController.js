var hal = require('hal');
/**
 * BusinessesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
   
    index:  async function(req, res) {
        
        let params = req.allParams();
        let business_id = params.business.id;
        console.log("business_id=>",business_id);

        let business_obj = await Businesses.findOne({where:{id:business_id}})
        .populate('opco')
        .populate('region')
        .populate('language')
        .populate('orders')
        .populate('customers')
        .populate('sales')
        .populate('digital_orders')
        .populate('products');
        
        if(business_obj){
            // let baseurl = req.headers.host;
            // let apiurl = req.url;
            // let business_url = baseurl+apiurl+'/'+business_obj.id;
            // let business_hal = new hal.Resource(business_obj,business_url);
            // business_hal.link(new hal.Link("business", business_url));
    
            // let getProdObj = await Products.find({business:business_id});
            // for(let prod of getProdObj){
            //     let product_hal = new hal.Resource(prod, baseurl+'/products/'+prod.id+'');
            //     business_hal.embed('products',[product_hal]);
            // }
            // return res.customRes(business_hal); 
            return res.ok(business_obj);
            
        }
        return res.badRequest({error:"Bussiness id does not exist",status:false});
          
    },
    loginotprequest: async function(req, res){
        let params = req.allParams();
        
        let phone = params.business.phone;
        //let normalized_phone = await UtilityService.normalize_phone(phone);
        let ret_obj = {};
        ret_obj['result'] = {};
        let otp = await UtilityService.generateOTP();
        if(!phone){
            return res.badRequest({
                err:'Phone number is required'
            })
        }
        let login = await Businesses.findOne({where:{phone:phone}});
        
        if(!login){
            return res.badRequest({error:"Phone number is not registered with us.",status:false});
        }

        let otpUpdate = await Businesses.update({id:login.id},{otp:otp}).fetch();

        if(otpUpdate){
          let message = "Your OTP is "+otp+" for the Navendor app. Fill it in the required column to activate the app.";
          if(!login.is_super){
            //sms deliver.
            ret_obj['status'] = true;
            ret_obj['result']['business_id'] = login.id;
            ret_obj['result']['is_super'] = login.is_super;
          }else{
            ret_obj['status'] = true;
            ret_obj['result']['business_id'] = login.id;
            ret_obj['result']['is_super'] = login.is_super;
            ret_obj['result']['otp'] = otp;
          }
        }else{
            return res.badRequest({error:"Couldn't generate OTP. Please try again.",status:false});
        }
        
        
        return res.ok(ret_obj);

    },
    verifyloginotp: async function(req, res){
        let params = req.allParams();

        let otp = params.business.otp;
        let business_id = params.business.id;
        let ret_obj = {};
        ret_obj['result'] = {};

        let verifyOTP = await Businesses.findOne({where:{and:[{otp:otp},{id:business_id}]}});
        
        if(otp && verifyOTP){
           let generated_password = verifyOTP.is_super?'cement000' : generate_login_password();
           let encryptedPassword = await UtilityService.hashPassword(generated_password); 
           console.log('encryptedPassword=>',encryptedPassword);
           console.log('verifyOTP.id=>',verifyOTP.id);
           
           //update password for the businesses id
           let updatepassword = await Businesses.update({id:verifyOTP.id},{password_digest:encryptedPassword}).fetch();
           console.log('updatepassword=>',updatepassword);
           if(generated_password && updatepassword){
                ret_obj['status'] = true;
                ret_obj['result']['business_id'] = verifyOTP.id;
                ret_obj['result']['password'] = generated_password;
           }else{
                return res.badRequest({error:"Unable to process request. Please try again.",status:false});
           }
        }else{
            return res.badRequest({error:"Unable to verify OTP. Please try again.",status:false});
        }

        return res.ok(ret_obj);
    },
    indexOne:  async function(req, res) {
        return res.ok('indexOne');
    },
    create:  async function(req, res) {
        return res.ok('cerated');
    },
    update:  async function(req, res) {
        return res.ok('updated');
    },
    destory:  async function(req, res) {
        return res.ok('destory');
    }  
};

