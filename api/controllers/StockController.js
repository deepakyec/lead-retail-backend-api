/**
 * StockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 
module.exports = {
  async lhfind(req,res){
      try
      {
        let lhProductsResult =await Lh_Products.find({
            select: [
                'id',
                'image_data',
                'material_code',
                'name',
                'position',
                'price_cents',
                'status',
                'websales_product_id',
            ]
        });
        let products = [];
        if(lhProductsResult.length > 0)
        {         
            async.each(lhProductsResult,(element,callback) => {
                products.push({
                    id: Number(element.id),
                    image_data: element.image_data,
                    material_code: element.material_code,
                    name: element.name,
                    position: element.position,
                    price_cents: element.price_cents,
                    status: element.status,
                    websales_product_id: element.websales_product_id,
                    _links: {
                        self:null
                    }
                })
                callback();
            },function(err){
                if(err != null)
                {
                    products = [];
                }
            })
        }
        return res.ok({
            total: products.length,
            _embedded: {
                products: products
            },
            _links: await ApplicationService.lh_products(req,req.params.business_id)
        });
      }
      catch(err)
      {
        return res.ok(err);
      }
  },
  async ordersXesFind(req,res){
      try
      {             
       
        let userData = await UtilityService.getUserIdFromHeaders(req);

        let _dates_data = { from_date : "",last_updated_date: "",to_date: "" }

        let ordersXesResult = await Orders_Xes.find({
            business_id: userData.id
        });


        let now = new Date();
        let currYear = now.getFullYear();

        let loyalities = await Loyalties.findOne({
            where : {
                sap_code: userData.sap_code,
                year: currYear
            },
            // sort: 'created_at DESC'
        });
        
        if(loyalities != null)
        {
            let month = loyalities.month - 1;
            // console.log('tempDate',tempDate);
            // let month = tempDate.getMonth();
            // console.log(loyalities.month);
            if( loyalities.month > 11)
            {
                loyalities.month -= 1;
            }
            else
            {
                loyalities.month = 1;
            }

            _dates_data.from_date =await UtilityService.formatToISODate( new Date(new Date(new Date().setMonth(loyalities.month)).setDate(1)) );
            _dates_data.last_updated_date =await UtilityService.formatToISODate( new Date(_dates_data.from_date).setDate(-0) );
            _dates_data.to_date =await UtilityService.formatToISODate( new Date() );
      
            
        }
      
        
        let OrdersResult = await Orders_Xes.find({
            where : { business_id:userData.id }
        });


        let orders = {};  

        if(OrdersResult.length != 0)
        {
            async.each(OrdersResult,async (element,callback) => {
                let getMonthOfElement = new Date(element.order_created_at);
                let getYearOfElement = new Date(element.order_created_at);
                getMonthOfElement = getMonthOfElement.getMonth() + 1;
                getYearOfElement = getYearOfElement.getFullYear();

                if(!orders.hasOwnProperty(getYearOfElement + '-' + getMonthOfElement))
                {
                    // let monthName =  (getYearOfElement + '-' + getMonthOfElement).toString()                    
                    // orders.push({ monthName : {} });
                    orders[getYearOfElement + '-' + getMonthOfElement] = {
                        confirmed_bags_total: 0,
                        estimated_bags_total: 0,
                        is_confirmed: false,
                        months: []
                    }                  
                }
                // else
                // {
                    // let ifMonthExistFlag = false; //-------------it means month is not there in the array
                    // for(let i = 0; i< orders.length ;i++)
                    // {
                    //     if(orders.hasOwnProperty(getYearOfElement + '-' + getMonthOfElement))
                    //     {
                    //         ifMonthExistFlag = true
                    //         console.log('in flag',j)
                    //     }                       
                    // }

                    // if(!ifMonthExistFlag)
                    // {
                        // let monthName =  (getYearOfElement + '-' + getMonthOfElement).toString()                    
                        // orders.push({ monthName : {} })
                        // orders[getYearOfElement + '-' + getMonthOfElement] = {
                        //     confirmed_bags_total: 0,
                        //     estimated_bags_total: 0,
                        //     is_confirmed: false,
                        //     months: []
                        // }
                        
                    //}
                //}
              

                //console.log('index'+j,orders)
         

                // let material_code_products =  await Lh_Products.findOne({
                //     material_code: element.material_code
                // });

                orders[getYearOfElement + '-' + getMonthOfElement].months.push({
                    added_by: element.added_by,
                    ars_sap_code: element.ars_sap_code,
                    batch_no: element.batch_no,
                    branch_code: element.branch_code,
                    created_at: element.created_at ,
                    default_quantity_bags: element.default_quantity_bags,
                    do_number: element.do_number,
                    id: element.id,
                    material_code: element.material_code,
                    order_created_at: element.order_created_at,
                    points: element.points,
                    quantity_bags: element.quantity_bags,
                    quantity_tonnes: element.quantity_tonnes,
                    sold_to_party_code: element.sold_to_party_code,
                    source: element.source,
                    status: element.status,
                    truck_no: element.truck_no,
                    updated_at: element.updated_at,
                    _links: {}
                });

                callback();
            },function(err){
                if(err != null)
                {
                    console.log(err)
                    return res.serverError(err)
                }
                else
                {
                    
                }

            })
        }
        
        
        return res.ok({ 
                total:10 ,
                _dates_data: _dates_data,
                _embedded: { orders: orders },_links: {
                    self: {
                        href: "http://localhost:9999/businesses/1/orders_xes"
                    }
                } 
            });

        // let data = await UtilityService.query(Orders_Xes, 'SELECT * FROM Orders_Xes WHERE business_id = ?', [userData.id])
        // console.log(data);

        // var Driver =await sails.getDatastore().driver;

        // console.log(Driver)

        //.then(console.log);
        
        // WHERE Orders_Xes.business_id = $1  userData.id
        // Orders_Xes.query('SELECT * FROM Orders_Xes', [ ] , function(err, rawResult) {
        //     console.log('err',err,'rawResult',rawResult);
        //     if (err) { return res.serverError(err); }
          
        //     return new Promise((resolve,reject) => {
        //         resolve(rawResult); 
        //     })

        //     sails.log(rawResult);
        //     // (result format depends on the SQL query that was passed in, and the adapter you're using)
          
        //     // Then parse the raw result and do whatever you like with it.
          
        //     return res.ok(rawResult);
          
        // });

        // if(OrdersResult.length != 0)
        // {

        // }

        

        // let from_date = await Orders_Xes.find({
        //     where : {
        //         business_id: req.params.business_id
        //             }, 
        //     select: ['created_at'],
        //     limit: 1,
        //     sort: 'created_at ASC'
        // });
        // console.log(from_date);


        // let last_updated_date = await Orders_Xes.find({
        //     where : {
        //         business_id: req.params.business_id
        //             },
        //     select: ['updated_at'],
        //     limit: 1,
        //     sort: 'updated_at DESC'
        // });
        // console.log(last_updated_date);
        //UtilityService.formatToISODate()

        // let _dates_data = {
        //     from_date: await UtilityService.formatToISODate(from_date[0].created_at) ,
        //     last_updated_date: await UtilityService.formatToISODate(last_updated_date[0].updated_at),
        //     to_date:  await UtilityService.formatToISODate(new Date())
        // }
        return res.ok({OrdersResult});
      }
      catch(err)
      {
        return res.ok(err);
      }
  }

};

