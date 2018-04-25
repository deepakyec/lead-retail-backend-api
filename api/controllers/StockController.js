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
            let month = loyalities.month;
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

            console.log(loyalities.month);
            console.log(new Date(new Date(new Date().setMonth(loyalities.month)).setDate(1)));
            _dates_data.from_date =await UtilityService.formatToISODate( new Date(new Date(new Date().setMonth(loyalities.month)).setDate(1)) );
            _dates_data.last_updated_date =await UtilityService.formatToISODate( new Date(new Date().setMonth(month)) );
            _dates_data.to_date =await UtilityService.formatToISODate( new Date() );
            //userData.from_date = ;
            
        }
        //console.log(new Date(loyalities.year,loyalities.month));

        


        

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
        return res.ok({_dates_data});
      }
      catch(err)
      {
        return res.ok(err);
      }
  }

};

