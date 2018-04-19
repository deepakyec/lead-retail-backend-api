var hal = require('hal');
module.exports = {
    // links(req,id){
    //     var halResponse =new hal.Resource({ },null);
    //     halResponse.link(new hal.Link("self", req.protocol+"://"+ req.hostname + req.originalUrl));
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
        return req.protocol+"://"+ req.hostname + 'business/'+ id ;
    },
    products_url(req,id,product_id){        
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/products'+(product_id==null? "":"/"+product_id);
    },
    customers_url(req,id){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/customers';
    },
    daily_reports_url(req,id,type){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/reports?type='+type;
    },
    leads_url(req,id){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/leads';
    },
    lh_products_url(req,id){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/lh_products';
    },
    loyalty_url(req,id){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/loyalty';
    },
    notification_settings_url(req,id){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/notification_settings';
    },
    orders_url(req,id){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/orders';
    },
    orders_xes_url(req,id){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/orders_xes';
    },
    
    push_subscriptions_url(req,id){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/push_subscriptions';
    },
    sales_url(req,id){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/sales';
    },
    weekly_reports_url(req,id,type){
        return req.protocol+"://"+ req.hostname + 'business/'+id+'/weekly_reports?type='+type;        
    }


}