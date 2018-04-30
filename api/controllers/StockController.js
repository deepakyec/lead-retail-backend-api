/**
 * StockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async getStockIndex(req,res){
        try
        {
            let userData = await UtilityService.getUserIdFromHeaders(req);

            let prodcutsResult = await Products.find({
                business: userData.id
            }).populate('stock_movement_collection',{
                sort: ['created_at DESC']
            }).sort('created_at DESC');

            let products = [];
            

            for(let i=0;i< prodcutsResult.length;i++)
            {
                let stockHistory = [];

                if(prodcutsResult[i].stock_tracked)
                {
                    for(let j=0;j < prodcutsResult[i].stock_movement_collection.length; j++)
                    {
                        let historyItem = prodcutsResult[i].stock_movement_collection[j];
                        stockHistory.push({
                            created_at: historyItem.created_at,
                            quantity: {
                                delta: historyItem.quantity,
                                before:  historyItem.product_quantity_before,
                                after:  historyItem.product_quantity_after,
                            },
                            title: await StockService.stockMovementTitle(historyItem),
                            type: await StockService.stockMovementType(historyItem.originator_type), 
                            _links : {
                                originator: {
                                    href : await StockService.stockMovementHref(req,prodcutsResult[i].business,historyItem)
                                }
                            }
                        })

                    }
                    //let result = await StockService.stockMovementHistory(req,prodcutsResult[i])
                }
                

                products.push({
                    image_data_uri: "",
                    images: {},
                    name: prodcutsResult[i].name,
                    price: prodcutsResult[i].price,
                    quantity: prodcutsResult[i].quantity,
                    stock_history: stockHistory,
                    stock_tracked: prodcutsResult[i].stock_tracked,
                    _links: {
                        self: {
                            href: await ApplicationService.products_url(req,prodcutsResult[i].business,prodcutsResult[i].id)
                        },
                        business: {
                            href: await ApplicationService.business_url(req,prodcutsResult[i].business)
                        }
                    }
                });
            }

            return res.ok({
                total: prodcutsResult.length,
                _embedded: {
                    products: products
                },
                _links: {
                    self: {
                        href: await ApplicationService.products_url(req,userData.id,null)
                    }
                }
            });
        }
        catch(err)
        {
            sails.log(err)
            return res.ok({err});
        }
    }
};

