module.exports = {
    async shareOptions(cust_name,cust_credit){
        let shareObject =[  { label:"Call", type:"call", url: "" },
                            { label:"SMS", type:"sms", url: "" },
                            { label:"WhatsApp", type:"whatsapp", url: "" }
                        ];

        if(cust_credit)
        {
            //---------------for SMS--------------------//
            shareObject[1].url = "sms:;?&body=Dear%20"+ cust_name +"%2C%20you%20have%20an%20overdue%20amount%20of%20"+ cust_credit +"%20to%20be%20paid%20to%20us.%20Request%20you%20to%20pay%20this%20amount%20at%20the%20earliest.";
            //---------------for Whatsapp--------------//
            shareObject[2].url = "https://api.whatsapp.com/send?text=Dear%20"+ cust_name + "%2C%20you%20have%20an%20overdue%20amount%20of%20"+ + cust_credit + +"%20to%20be%20paid%20to%20us.%20Request%20you%20to%20pay%20this%20amount%20at%20the%20earliest.";        
        }
        else
        {
            shareObject[1].url = "sms:;?&body=Dear%20"+ cust_name + "%2C%20you%20have%20an%20overdue%20amount%20of%20%E2%82%B90.00%20to%20be%20paid%20to%20us.%20Request%20you%20to%20pay%20this%20amount%20at%20the%20earliest."
            shareObject[2].url = "https://api.whatsapp.com/send?text=Dear%20"+ cust_name + "%2C%20you%20have%20an%20overdue%20amount%20of%20%E2%82%B90.00%20to%20be%20paid%20to%20us.%20Request%20you%20to%20pay%20this%20amount%20at%20the%20earliest.";        
        }            

        
        return shareObject;
    },
    async getCreditHistory(cust_id){
        try
        {
            let sale_entry = await Sales.find({
                customer: cust_id
            });

            console.log('sale_entry',sale_entry);
    
            let payments_entry = await Credit_ledger_entries.find({
                customer_id: cust_id
            });

            console.log('payments_entry',payments_entry);

            let result_ret = [];
    
            if(payments_entry != null || payments_entry != [])
            {
                async.forEach(payments_entry,(element,callback) => {          
                             
                    result_ret.push({
                            id: element.id,
                            amount_cents: (element.amount_cents),
                            sale_id: element.id,
                            amount_string: String((element.amount_cents/100)),
                            balance_cents: element.amount_cents,
                            balance_string: String((element.amount_cents)),
                            notes: element.notes ,
                            created_at: element.created_at,
                            type: "credit_payment"
                    });
                    callback();
                },(err) => {
    
                })
            }
    
            if(sale_entry != null || sale_entry != [])
            {
                async.forEach(sale_entry,(element,callback) => {
                    result_ret.push({
                        id: sale_entry.id,
                        amount_cents: sale_entry.total_cents,
                        sale_id: sale_entry.id,
                        amount_string: (sale_entry.total_cents/100).toString(),
                        balance_cents: sale_entry.total_cents,
                        balance_string: (sale_entry.total_cents).toString(),
                        notes: sale_entry.notes,
                        created_at: sale_entry.created_at,
                        type:  ( sale_entry.payment_received || sale_entry.payment_received == 'no' )  ? 'credit_sale' : 'cash_sale'
                    });
                    callback
                },(err) => {
                    
                })
            }
            console.log('while returning',result_ret);
            return result_ret;
        }
        catch(err)
        {
            console.log(err);
        }
        
    }
    
}