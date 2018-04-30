var hal = require('hal');
module.exports = {
    // links(req,id){
    //     var halResponse =new hal.Resource({ },null);
    //     halResponse.link(new hal.Link("self", req.protocol+"://"+ sails.config.globals.baseUrl  + req.originalUrl));
    //     halResponse.link(new hal.Link("business", business_url(req,id) ));
    //     halResponse.link(new hal.Link("customers", customers_url(req,id)) );
    //     halResponse.link(new hal.Link("daily_reports", daily_reports(req,id,"daily") ));
    //     halResponse.link(new hal.Link("leads_url", leads_url(req,id)) );
    //     halResponse.link(new hal.Link("lh_products",  lh_products_url(req,id) ));
    //     halResponse.link(new hal.Link("loyalty", loyalty_url(req,id)) );
    //     halResponse.link(new hal.Link("notification_settings",  notification_settings_url(req,id)) );
    //     halResponse.link(new hal.Link("orders",  orders_url(req,id)) );
    //     halResponse.link(new hal.Link("orders_xes", orders_xes_url(req,id)) );
    //     halResponse.link(new hal.Link("products", products_url(req,id)) );
    //     halResponse.link(new hal.Link("push_subscriptions", push_subscriptions_url(req,id)) );
    //     halResponse.link(new hal.Link("sales", sales_url(req,id) ));
    //     halResponse.link(new hal.Link("weekly_reports", weekly_reports_url(req,id,"weekly")));
    //     return halResponse.toJSON()
    // },
    business_url(req,id){
        return req.protocol+"://"+ sails.config.globals.baseUrl + '/business/'+ id ;
    },
    products_url(req,id,product_id){        
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/products'+ ( product_id==null? "":"/"+product_id );
    },
    customers_url(req,id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/customers';
    },
    daily_reports_url(req,id,type){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/reports?type='+type;
    },
    leads_url(req,id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/leads';
    },
    lh_products_url(req,id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/lh_products';
    },
    loyalty_url(req,id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + 'business/'+id+'/loyalty';
    },
    notification_settings_url(req,id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/notification_settings';
    },
    orders_url(req,id,order_id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/orders'+( order_id != null ? "/" + order_id: "") ;
    },
    orders_xes_url(req,id,orderX_id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/orders_xes'+( orderX_id != null ? "."+orderX_id: "" );
    },
    
    push_subscriptions_url(req,id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/push_subscriptions';
    },
    sales_url(req,id,sale_id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/sales'+ (sale_id != null ? "/"+sale_id : "" );
    },
    weekly_reports_url(req,id,type){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+id+'/weekly_reports?type='+type;        
    },
    customers_url_for_credits(req,business_id,id,isCredits)
    {
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/business/'+business_id+'/customers/'+id+(isCredits == true ? "":"/credit");
    },
    lh_products(req,id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/businesses/'+id+'/lh_products';
    },
    digital_orders(req,id,order_id){
        return req.protocol+"://"+ sails.config.globals.baseUrl  + '/businesses/'+id+'/digital_orders' + (order_id != null ? "/"+order_id : "" );
    }

}