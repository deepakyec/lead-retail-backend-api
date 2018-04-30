var hal = require('hal');

module.exports={
    show: async function(req,res) {
        let params = req.allParams();
        
        let order_id = params.fk;
        
        let order = await Orders.findOne({where:{id:order_id}})
        .populate('business');
        if(order){
            
            return res.ok(order);
        }
        return res.notfound({err:'order id does not exist'});
    },

    async digitalOrders(req,res){
        try
        {
            let userData = await UtilityService.getUserIdFromHeaders(req);

            let ordersData = await Digital_Orders.find({
                business: userData.id
            })
            .populate('dealer_id')
            .sort(['created_at DESC'])
            let orders = []
            for(let i=0;i< ordersData.length ;i++)
            {
                orders.push({
                    accepted_quantity: ordersData[i].accepted_quantity,
                    business_id: Number(ordersData[i].business),
                    created_at: ordersData[i].created_at,
                    dealer_data: ordersData[i].dealer_id,
                    dealer_id: Number(ordersData[i].dealer_id.id),
                    delivered_at: ordersData[i].delivered_at,
                    digital_order_product: await Lh_Products.findOne({
                        websales_product_id: ordersData[i].websales_product_id
                    }),
                    id: Number(ordersData[i].id),
                    quantity: Number(ordersData[i].quantity),
                    status: ordersData[i].status,
                    updated_at: ordersData[i].updated_at,
                    websales_id: ordersData[i].websales_id,
                    websales_order_updated_at: ordersData[i].websales_order_updated_at,
                    websales_product_id: Number(ordersData[i].websales_product_id),
                    websales_status: ordersData[i].websales_status,
                    _links: {
                        business: {
                            href: await ApplicationService.business_url(req,ordersData[i].business)
                        },
                        self: {
                            href: await ApplicationService.digital_orders(req,Number(ordersData[i].business),Number(ordersData[i].id))
                        }
                    } 
                })
            }

            return res.ok({
                total: orders.length,
                _embedded: {
                    orders : orders 
                },
                _links: {
                    self: {
                        href: await ApplicationService.digital_orders(req,Number(userData.id),null)
                    }
                }
            })
        }
        catch(err)
        {
            return res.ok(err)
        }        
    }
}