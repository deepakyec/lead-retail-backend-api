var hal = require('hal');
/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    async create(req,res){
        return res.ok();
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
        
    }
};

