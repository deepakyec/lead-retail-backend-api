module.exports = {
    async getCustomerAndCreditHistoryData(req,business_id,customer_id){

        return new Promise(async (resolve, reject) => {

        

        let customerData = []

        let customerTableData = [];
        if(business_id != null)
        {
            customerTableData = await Customers.find({
                business: business_id
            });
        }
        else
        {        
            customerTableData = await Customers.find({
                id: customer_id
            });
        }
        


        async.each(customerTableData,async (element,callback) => {

            let creditHistoryData = await BusinessService.getCreditHistory(element.id);
            
            customerData.push({
                credit_cents: element.credit_cents,
                credit_history: ( creditHistoryData == null || creditHistoryData ==[] ? []:creditHistoryData ) ,
                customer_address: element.customer_address,
                credit_string:  (business_id != null ? String("₹"+(element.credit_cents/100)): element.credit_cents/100),
                customer_email: element.customer_email,
                customer_locality: element.customer_locality,
                customer_phone:  element.customer_phone,
                full_name:   element.full_name,
                initials:  element.full_name.toString().charAt(0).toUpperCase(),
                share_options: await BusinessService.shareOptions(element.full_name,element.credit_cents),
                _links:{
                    credits: {                        
                        href: await ApplicationService.customers_url_for_credits(req,element.business,element.id,false)
                    },
                    business: {
                        href: await ApplicationService.business_url(req,element.business)
                    },
                    self: {
                        href: await ApplicationService.customers_url_for_credits(req,element.business,element.id,true)
                    }
                }
            });
            callback();
        },function(err){
            resolve(customerData);
        });
        });
    }
}