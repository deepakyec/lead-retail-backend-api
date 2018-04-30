module.exports = {
    async stockMovementHref(req,businessId,record){
        try
        {
            let Url = "";
            sails.log(record);
            if(record.originator_type == "Business")
            {
                Url = await ApplicationService.business_url(req,businessId);
            }
            else if(record.originator_type == "Sale")
            {
                Url = await ApplicationService.sales_url(req,businessId,record.id);
            }
            else if(record.originator_type == "Order")
            {
                Url = await ApplicationService.orders_url(req,businessId,record.originator_id);
            }
            else if(record.originator_type == "OrdersX")
            {
                Url = await ApplicationService.orders_xes_url(req,businessId,product.originator_id);
            }

            return Url;
        }
        catch(err)
        {
            sails.log(err)
            return null;
        }
    },
    async stockMovementType(originatorType){
        try
        {
            let type="";
            if(originatorType == "Business")
            {
                type = "manual";
            }
            else if(originatorType == "Sale")
            {
                type = "sale";
            }
            else if(originatorType == "Order")
            {
                type = "order";
            }
            else if(originatorType == "OrdersX")
            {
                type = "bags_lifting";
            }
            return type;
        }
        catch(err)
        {
            return null;
        }
    },
    async stockMovementTitle(historyRecord){
        try
        {
            let title="";
            if(historyRecord.originator_type == "Business")
            {
                title = "Manually set";
            }
            else if(historyRecord.originator_type == "Sale")
            {
                if(historyRecord.quantity > 0)
                {
                    title = "Sale deleted";
                }
                else if(historyRecord.originator_type == "Customer")
                {
                    let customer = await Customers.findOne({
                        id: historyRecord.originator_id
                    })
                    title = "Sale to "+ customer.full_name;
                }
                else
                {
                    title = "Sale (No customer added)";
                }
                
            }
            else if(historyRecord.originator_type == "Order")
            {
                title = "Order";
            }
            else if(historyRecord.originator_type == "OrdersX")
            {
                title = (historyRecord.quantity > 0) ? "Bags Lifting":"Bags Lifting deleted";
                // if(historyRecord.quantity > 0)
                // {
                //     title = "Bags Lifting";
                // }
                // else
                // {
                //     title = "Bags Lifting deleted";
                // }
            }
            else 
            {
                title = (historyRecord.quantity > 0) ? "Bags Lifting":"Bags Lifting deleted";
                // if(historyRecord.quantity > 0)
                // {
                //     title = "Bags Lifting";
                // }
                // else
                // {
                //     title = "Bags Lifting deleted";
                // }
            }
            return title;
        }
        catch(err)
        {
            return null;
        }
    }

    

 }