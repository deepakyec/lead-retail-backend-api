/**
 * ApplicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var hal = require('hal');
module.exports = {
    index: async function(req, res) {

        let data = await UtilityService.getUserIdFromHeaders(req);
        let id  = data.id
        let business = ApplicationService.business_url(req,id);
        let customers =  ApplicationService.customers_url(req,id);
        let daily_reports = ApplicationService.daily_reports_url(req,id,"daily") ;
        let leads_url = ApplicationService.leads_url(req,id) ;
        let lh_products = ApplicationService.lh_products_url(req,id) ;
        let loyalty = ApplicationService.loyalty_url(req,id);
        let notification_settings = ApplicationService.notification_settings_url(req,id);
        let orders = ApplicationService.orders_url(req,id) ;
        let orders_xes = ApplicationService.orders_xes_url(req,id);
        let products = ApplicationService.products_url(req,id,null);
        let push_subscriptions = ApplicationService.push_subscriptions_url(req,id);
        let sales = ApplicationService.sales_url(req,id);
        let weekly_reports = ApplicationService.weekly_reports_url(req,id,"weekly");
        

        var halResponse =new hal.Resource({ },null);
        halResponse.link(new hal.Link("self", req.protocol+"://"+ req.host + req.originalUrl));
        halResponse.link(new hal.Link("business", business));
        halResponse.link(new hal.Link("customers", customers ));
        halResponse.link(new hal.Link("daily_reports", daily_reports));
        halResponse.link(new hal.Link("leads_url", leads_url));
        halResponse.link(new hal.Link("lh_products", lh_products));
        halResponse.link(new hal.Link("loyalty", loyalty ));
        halResponse.link(new hal.Link("notification_settings", notification_settings ));
        halResponse.link(new hal.Link("orders", orders));
        halResponse.link(new hal.Link("orders_xes", orders_xes ));
        halResponse.link(new hal.Link("products", products));
        halResponse.link(new hal.Link("push_subscriptions",push_subscriptions ));
        halResponse.link(new hal.Link("sales",sales));
        halResponse.link(new hal.Link("weekly_reports",weekly_reports));

        
        if(res==null)
        {
            return halResponse;
        }
        else
        {
            return res.ok(halResponse.toJSON());      
        }
        

    }
};

