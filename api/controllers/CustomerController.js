var hal = require('hal');
/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    async create(req,res){
        try
        {
            let params = req.allParams();            

            let customerResult = await Customers.create({
                customer_phone: params.customer.customer_phone,
                full_name: params.customer.full_name,
                business: params.id
            }).fetch();

            var halResource =  new hal.Resource({
                credit_cents:Number(customerResult.credit_cents),
                credit_history:[],
                credit_string: customerResult.credit_string,
                customer_address: customerResult.customer_address,
                customer_email: customerResult.customer_email,
                customer_locality: customerResult.customer_locality,
                customer_phone: customerResult.customer_phone,
                full_name: customerResult.full_name,
                initials: customerResult.initials,
                share_options : await BusinessService.shareOptions(customerResult.full_name,customerResult.credit_cents)
            });

            halResource.link("business",await ApplicationService.business_url(req,params.id));

            halResource.link("credits",await ApplicationService.customers_url_for_credits(req,params.id,customerResult.id,false));
            halResource.link("self",await ApplicationService.customers_url_for_credits(req,params.id,customerResult.id,true));

    
            return res.ok(halResource.toJSON());

        }
        catch(err)
        {
            return res.serverError({err});
        }        
    },
    async findOne(req,res){
        try
        {
            
            let params = req.allParams();
            console.log(params);
            let data = await CreditService.getCustomerAndCreditHistoryData(req,null,params.cust_id);     
            //for user we're fetchin only one customer's data so providing hardcoded 0'th index
            var halResponse = {
                credit_cents: data[0].credit_cents,
                credit_history:data[0].credit_history,
                credit_string:data[0].credit_string,
                customer_address:data[0].customer_address,
                customer_email:data[0].customer_email,
                customer_locality:data[0].customer_locality,
                customer_phone:data[0].customer_phone,
                full_name:data[0].full_name,
                initials:data[0].initials,
                share_options: data[0].share_options,
                _links: data[0]._links
            };       
            return res.ok(halResponse);
        }
        catch(err)
        {
            console.log(err);
            return res.serverError(err);
        }
        
    },
    async update(req,res){
        try
        {
            let params = req.allParams();

            let attributes = {};

            if(params.customer.full_name.toString().trim() == null)
            {
                return res.ok({customer_update_status: false ,result:customerResult,status :false,error:"Please Provide Name Of Customer" });
            }

            if(params.customer.customer_phone.toString().trim() == null)
            {
                return res.ok({customer_update_status: false ,result:customerResult,status :false, error:"Please Provide Phone No. Of Customer"});
            }

            let DuplicateDataResults = []
            DuplicateDataResults = await Customers.find({
                or : [
                    { customer_phone: params.customer.customer_phone },
                    { full_name: params.customer.full_name }
                ],
                id: {
                    nin: [params.cust_id]
                }
            })

            if(DuplicateDataResults.length != 0)
            {
                return res.ok({customer_update_status: false ,result:customerResult,status :false})
            }

            attributes['customer_phone'] = params.customer.customer_phone;
            attributes['full_name'] = params.customer.full_name;

            let customerResult = await Customers.update({ id:params.cust_id },attributes).fetch();    
                    
            return res.ok({customer_update_status: true ,result:customerResult,status :true})
        }
        catch(err)
        {
            return res.ok({customer_update_status: false ,result:{},status:false});
        }
    },
    async credit(req,res){
        try
        {
            let params = req.allParams();

            let creditPaymentResult = await Credit_Payments.create({
                
            })
            
            console.log(params);

            return res.ok();
        }
        catch(err)
        {
            return res.serverError(err);
        }
    }
};

