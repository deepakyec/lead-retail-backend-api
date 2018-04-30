
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
      
        let OrdersResult = [];
        if(req.params.show_order_with_previous_year == null || req.params.show_order_with_previous_year == false)
        {
            OrdersResult = await Orders_Xes.find({
                where : { business_id:userData.id }
            });    
        }
        else
        {            
            OrdersResult = await Orders_Xes.find({
                where : { 
                    business_id:userData.id,
                    created_at:  { 
                        '>': new Date(sails.config.globals.moment().subtract(1, 'year').month(0).date(1)),//----setting previous year's 1'st Jan
                        '<': new Date() }
                }
            });    
        }
        

        let orders = {};  

        let selfUrl = await ApplicationService.orders_xes_url(req,userData.id);

        if(OrdersResult.length != 0)
        {
            async.each(OrdersResult,async (element,callback) => {
                let getMonthOfElement = new Date(element.order_created_at);
                let getYearOfElement = new Date(element.order_created_at);
                getMonthOfElement = getMonthOfElement.getMonth() + 1;
                getYearOfElement = getYearOfElement.getFullYear();

                if(!orders.hasOwnProperty(getYearOfElement + '-' + getMonthOfElement))
                {
                    orders[getYearOfElement + '-' + getMonthOfElement] = {
                        confirmed_bags_total: 0,
                        estimated_bags_total: 0,
                        is_confirmed: false,
                        months: []
                    }                  
                }
                
                
                let material_code_products = await Lh_Products.findOne({
                    material_code: element.material_code
                });

                let orderObj = {
                    added_by: element.added_by,
                    ars_sap_code: element.ars_sap_code,
                    batch_no: element.batch_no,
                    branch_code: element.branch_code,
                    created_at: element.created_at ,
                    default_quantity_bags: element.default_quantity_bags,
                    do_number: element.do_number,
                    id: element.id,
                    material_code: element.material_code,
                    material_code_products: material_code_products,
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
                }

                let orderMonth = new Date(element.order_created_at).getMonth() + 1 ;//----------Because january comes as 0 so it's always +1
                let orderYear = new Date(element.order_created_at).getFullYear();

                let confirmedBags = await Loyalties.find({
                    month: orderMonth,
                    year: orderYear,
                    sap_code:element.ars_sap_code
                })

                if(confirmedBags.length > 0)
                {
                    orders[getYearOfElement + '-' + getMonthOfElement].is_confirmed = true;
                    orders[getYearOfElement + '-' + getMonthOfElement].is_confirmed = confirmedBags[0].quantity_tonnes/ 5;
                }

                orders[getYearOfElement + '-' + getMonthOfElement].estimated_bags_total += element.default_quantity_bags;
                orders[getYearOfElement + '-' + getMonthOfElement].months.push(orderObj);

                callback();
            },function(err){
                if(err != null)
                {
                    return res.ok({ 
                        total: 0 ,
                        _dates_data: _dates_data,
                        _embedded: { orders: orders },
                        _links: {
                            self: {
                                href: selfUrl
                            }
                        } 
                    });
                }
                else
                {
                    return res.ok({ 
                        total: OrdersResult.length ,
                        _dates_data: _dates_data,
                        _embedded: { orders: orders },
                        _links: {
                            self: {
                                href: selfUrl
                            }
                        } 
                    });
                }
            })
        }
        
      }
      catch(err)
      {
        return res.ok(err);
      }
  },
  async create(req,res){
      try
      {

        let userData = await UtilityService.getUserIdFromHeaders(req);

        let params = req.allParams();

        //let temp = new Date( sails.config.globals.moment(params.order_created_at).startOf('month').add(1,'day') );
        //temp = new Date(temp + 1);
        //sails.log(temp);
        //sails.log(new Date(sails.config.globals.moment().endOf('month')));

        let params = req.allParams();
        let result = Orders_Xes.create({
            material_code: params.material_code,
            quantity_bags: Number(params.quantity_bags),
            default_quantity_bags: Number(params.quantity_bags),
            quantity_tonnes: (Number(params.quantity_bags)* 50 / 1000).toString(),
            points: await BagsLiftedService.calculate_points(req,userData.id,true,null),
            order_created_at: params.order_created_at,
            source: params.source,
            added_by: userData.id,
            updated_at: new Date()
        }).fetch();

        return res.ok(result);
      }
      catch(err)
      {
        return res.ok(err);
      }
  }

};

