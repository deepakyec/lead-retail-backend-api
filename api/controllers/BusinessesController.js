var hal = require('hal');
/**
 * BusinessesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
   
    index:async function(req, res) {
        
        try
        {
            let params = req.allParams();
            //console.log("business_id=>",params.id);
            //console.log(params.business);
            let business_id = params.id;
            console.log("business_id=>",business_id);
            
            let business_obj = await Businesses.findOne({where:{id:business_id}})
            .populate('opco')
            .populate('region')
            .populate('language')
            .populate('orders')
            .populate('customers')
            .populate('sales')
            .populate('digital_orders')
            .populate('products')
           
            let digital_order_products_data = await  Digital_Order_Products.find({                
                where : {
                        status: true
                        }
            });   

            // let sales_tax = {
            //     name: sails.config.globals.sales_tax.name,
            //     percentage: sails.config.globals.sales_tax.percentage
            // }

            
    //-------------------Binding Menus--------------//
            let parent_menu = await Menus.find({
                parent_id: 0
            }).populate('submenus',{
                select: ['status'],
                where: {
                    opco_id: business_obj.opco.id
                }
            });
           
            var tabs_menu = {};
            
            async.each(parent_menu,(element,callback) => {
                
                tabs_menu[element.name] ={ is_enabled:  element.status , sub_menu: {} };

                
                Menus.find({
                    parent_id: element.id
                }).populate('submenus',{
                    select: ['status'],
                    where: {
                        opco_id: business_obj.opco.id
                    }
                }).then((data)=>{
                    let sub_menu = data;                     
                     for(currMenu in sub_menu){
                        let fCurrMenu = sub_menu[currMenu];                        
                        tabs_menu[element.name].sub_menu[fCurrMenu.name] = { 
                                 is_enabled:  fCurrMenu.status 
                        };
                     }
                     callback();
                });

                //console.log(JSON.stringify(sub_menu));
               
                
                // async.each(sub_menu,(sub_elements) => {
                //     let name = sub_elements.name
                //     //console.log(JSON.stringify(sub_elements));
                //     tabs_menu[element.name].sub_menu = { 
                //         sub_elements.name: { is_enabled:  sub_elements.status } 
                //     }   
                //     console.log( tabs_menu[element.name].sub_menu );                 
                // },
                // (err) => {

                // })
            },function(err){
                if(err)
                {
                    return res.serverError({err});
                }
                else
                {           
                    var halResponce = new  hal.Resource({
                        address: business_obj.address,
                        contact_person:business_obj.contact_person,
                        currency:"INR",
                        currency_symbol:"₹",
                        dealers_data:[],
                        digital_order_products_data:digital_order_products_data,
                        email:business_obj.email,
                        lh_products:[],
                        locale:business_obj.locale,
                        locality:business_obj.locality,
                        menu_settings:{ tabs_menu: tabs_menu} ,
                        name:business_obj.name,
                        notificationLastUpdated:'',
                        phone:business_obj.phone,
                        profile_data:business_obj.profile_data,
                        profile_data_url:null,
                        sales_tax:{
                            name: sails.config.globals.sales_tax.name,
                            percentage: sails.config.globals.sales_tax.percentage
                        },
                        sap_code:business_obj.sap_code,
                        tnc_accepted:business_obj.tnc_accepted,
                        total_credit_cents:business_obj.total_credit_cents,
                        total_credit_string:""
                      });    
                    
                    halResponce.link(new hal.Link("self", req.protocol+"://"+ req.host + req.originalUrl));
                    halResponce.embed('products',[]);
                    return res.ok(halResponce.toJSON());
                    // return res.ok({ 
                    //     address: business_obj.address,
                    //     contact_person:business_obj.contact_person,
                    //     currency:"INR",
                    //     currency_symbol:"₹",
                    //     dealers_data:[],
                    //     digital_order_products_data:digital_order_products_data,
                    //     email:business_obj.email,
                    //     lh_products:[],
                    //     locale:business_obj.locale,
                    //     locality:business_obj.locality,
                    //     menu_settings:{ tabs_menu: tabs_menu} ,
                    //     name:business_obj.name,
                    //     notificationLastUpdated:'',
                    //     phone:business_obj.phone,
                    //     profile_data:business_obj.profile_data,
                    //     profile_data_url:null,
                    //     sales_tax:sales_tax,
                    //     sap_code:business_obj.sap_code,
                    //     tnc_accepted:business_obj.tnc_accepted,
                    //     total_credit_cents:business_obj.total_credit_cents,
                    //     total_credit_string:"",
                    // });
                }                
            })
                 
        }
        catch(err)
        {
            console.log(err);
            return res.badRequest({error:"Bussiness id does not exist",status:false});
        }                 
    },    
    loginotprequest: async function(req, res){
        let params = req.allParams();
        console.log(params);
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

