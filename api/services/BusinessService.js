module.exports = {
    async shareOptions(cust_name,cust_credit){
        let shareObject =[  { label:"Call", type:"call", url: "" },
                            { label:"SMS", type:"sms", url: "" },
                            { label:"WhatsApp", type:"whatsapp", url: "" }
                        ];

        //---------------for SMS--------------------//
        shareObject[1].url = "sms:;?&body=Dear "+ cust_name + ", you have an overdue amount of "+ cust_credit +" to be paid to us. Request you to pay this amount at the earliest."
        //---------------for Whatsapp--------------//
        shareObject[2].url = "https://api.whatsapp.com/send?text=Dear "+ cust_name + ", you have an overdue amount of "+ cust_credit +" to be paid to us. Request you to pay this amount at the earliest.";
        
        return shareObject;
    },
    async getCreditHistory(cust_id){
        try
        {
            let sale_entry = await Sales.find({
                customer: cust_id
            });
    
            let payments_entry = await Credit_ledger_entries.find({
                customer_id: cust_id
            });

            let result_ret = [];
    
            if(payments_entry != null || payments_entry != [])
            {
                async.forEach(payments_entry,(element,callback) => {          
                             
                    result_ret.push({
                            id: Number(element.id),
                            amount_cents: (element.amount_cents),
                            sale_id: Number(element.id),
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
                        id: Number(element.id),
                        amount_cents: element.total_cents,
                        sale_id: Number(element.id),
                        amount_string: (element.total_cents/100).toString(),
                        balance_cents: element.total_cents,
                        balance_string: (element.total_cents).toString(),
                        notes: element.notes,
                        created_at: element.created_at,
                        type:  ( element.payment_received || element.payment_received == 'no' )  ? 'credit_sale' : 'cash_sale'
                    });
                    callback
                },(err) => {
                    
                })
            }

            return result_ret;
        }
        catch(err)
        {
            let result_ret = []
            return result_ret;            
        }
        
    }
    
}