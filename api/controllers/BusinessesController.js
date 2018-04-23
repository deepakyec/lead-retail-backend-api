var AppController = require('./ApplicationController');
var BusinessContrllr = require('../controllers/BusinessesController')
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
            
            let product = await Products.find({
                select: [
                    'id',
                    'image_data_uri',
                    'name',
                    'price',
                    'quantity',
                    'stock_tracked'
                ]
            });

            let productList = [];

            for(currProd in product){                
                let tempProdData = product[currProd];
                productList.push({                     
                    image_data_uri : tempProdData.image_data_uri,
                    name : tempProdData.name,
                    price : tempProdData.price,
                    quantity : tempProdData.quantity,
                    stock_tracked : tempProdData.stock_tracked, 
                    _links: {
                        business:{ 
                            href: ApplicationService.business_url(req,business_obj.id)
                        },
                        self:{
                            href: ApplicationService.products_url(req,business_obj.id,tempProdData.id)
                        }
                    }                   
                });
            }

            
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

            
            },function(err){
                if(err)
                {
                    return res.serverError({err});
                }
                else
                {           
                    var halResponce = new  sails.config.globals.hal.Resource({
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
                        opco_id:business_obj.opco.id,
                        opco_data: business_obj.opco,
                        region_id: business_obj.region.id,
                        language_id: business_obj.language.id,
                        sales_tax:{
                            name: sails.config.globals.sales_tax.name,
                            percentage: sails.config.globals.sales_tax.percentage
                        },
                        sap_code:business_obj.sap_code,
                        tnc_accepted:business_obj.tnc_accepted,
                        total_credit_cents:business_obj.total_credit_cents,
                        total_credit_string:""
                      });    
                    
                    halResponce.link(new sails.config.globals.hal.Link("self", req.protocol+"://"+ req.host + req.originalUrl));

                    let f_res = halResponce.toJSON();
                                
                    f_res['_embedded'] = {'products':productList};
                    return res.ok(f_res);                   
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
        
        let phone = params.business.phone;
        //let normalized_phone = await UtilityService.normalize_phone(phone);
        let ret_obj = {};
        ret_obj['result'] = { };
        let otp = await UtilityService.generateOTP();
        if(!phone){
            return res.badRequest({ 
                result: {
                        error:"Phone number is required" 
                        },
                status:false})
        }
        let login = await Businesses.findOne({
            phone:phone
        });
        
        if(login == null){            
            return res.ok({ 
                result: {
                        error:"Phone number is not registered with us." 
                        },
                status:false}
            );
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
            return res.serverError(
                { 
                    result: {
                            error:"Couldn't generate OTP. Please try again."
                            },
                    status:false}
                );
        }
        
        return res.ok(ret_obj);

    },
    verifyloginotp: async function(req, res){
        let params = req.allParams();        
      
        console.log(params.business);

        let otp = params.business.otp;
        let business_id = params.business.id;
        let ret_obj = {};
        ret_obj['result'] = {};

        let verifyOTP = await Businesses.findOne({
                id:business_id                
        });
        
        if(verifyOTP == null)
        {
            return res.ok({error:"Invalid Username",status:false});
        }

        if(otp != verifyOTP.otp)
        {
            return res.ok({error:"Invalid OTP",status:false});
        }
        
        // if(otp && verifyOTP)
        // {

           //let generated_password = verifyOTP.is_super?'cement000' : String(Math.floor(Math.random() * 900000) + 100000);
           let generated_password = verifyOTP.is_super?'cement000' : UtilityService.generateRandomString();
           let encryptedPassword = await UtilityService.hashPassword(generated_password); 
           console.log('encryptedPassword=>',encryptedPassword);
           console.log('verifyOTP.id=>',verifyOTP.id);
           
           //update password for the businesses id
           let updatepassword = await Businesses.update({id:verifyOTP.id},{password_digest:encryptedPassword}).fetch();
           
           if(generated_password && updatepassword){
                ret_obj['status'] = true;
                ret_obj['result']['business_id'] = verifyOTP.id;
                ret_obj['result']['password'] = generated_password;
           }else{
                return res.badRequest({error:"Unable to process request. Please try again.",status:false});
           }

        //}
        // else
        // {
        //     return res.badRequest({error:"Unable to verify OTP. Please try again.",status:false});
        // }

        return res.ok(ret_obj);
    },
    credit:async function(req,res) {
        try
        {
            
            let linkResult = await AppController.index(req,null);

            let data = await UtilityService.getUserIdFromHeaders(req);
            let id  = data.id

            let business_obj = await Businesses.findOne({where:{id:id}})
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

            let customerTableData = await Customers.find({
                business: business_obj.id
            });

            let customerData = [];

            // if(customerTableData != [] || customerData != null )
            // {
                
            // }
            async.each(customerTableData,async (element,callback) => {
                customerData.push({
                    credit_cents: element.credit_cents,
                    credit_history: [],
                    customer_address: element.customer_address,
                    credit_string:  "₹"+(element.credit_cents/100).toString(),
                    customer_email: element.customer_email,
                    customer_locality: element.customer_locality,
                    customer_phone:  element.customer_phone,
                    full_name:   element.full_name,
                    initials:  element.full_name.toString().charAt(0).toUpperCase(),
                    share_options: await BusinessService.shareOptions(element.full_name,element.credit_cents),
                    _links:{
                        self: {
                            href: await ApplicationService.customers_url_for_credits(req,element.business,element.id,false)
                        },
                        business: {
                            href: await ApplicationService.business_url(req,element.business)
                        },
                        credits: {
                            href: await ApplicationService.customers_url_for_credits(req,element.business,element.id,true)
                        }
                    }
                });
            },function(err){
                if(err){
                    customerData = [];
                }
            });

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

            
            },function(err){
                if(err)
                {
                    return res.serverError({err});
                }
                else
                {          
                    let bussURL =  ApplicationService.business_url(req,id); 
                    var halResponce = {
                        business: {
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
                            total_credit_string:"₹"+(business_obj.total_credit_cents/100).toString(),
                            _embedded: {
                                 product: []
                            },
                            _links: {
                                self: {
                                    href: ApplicationService.business_url(req,id)
                                }
                            }
                        },
                        customers:customerData,
                        notificationLastUpdated:'',
                        _links: linkResult                        
                      };                                        
                    return res.ok(halResponce);                   
                }                
            })
             
        }
        catch(err)
        {
            res.serverError({err});
        }
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

