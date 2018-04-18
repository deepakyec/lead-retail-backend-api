var hal = require('hal');
/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index:  async function(req, res) {
        console.log("<=============request=============>",req.headers.host);
        console.log("<=============request=============>",req.url);
        let params = req.allParams();
        let business_id = params.business.id;

        let business_obj = await Businesses.findOne({where:{id:business_id}});
        
        let baseurl = req.headers.host;
        let apiurl = req.url;
        let business_url = baseurl+apiurl;
        let business_hal = new hal.Resource(business_obj,business_url);
        business_hal.link(new hal.Link("products", business_url));

        let getProdObj = await Products.find({business:business_id});
        for(let prod of getProdObj){
            let product_hal = new hal.Resource(prod, baseurl+'/products/'+prod.id+'');
            business_hal.embed('products',[product_hal]);
        }
        return res.ok(business_hal);   
    },
    indexOne:  async function(req, res) {
        return res.ok('indexOne');
    },
    create:  async function(req, res) {
        return res.ok('cerated');
    },
    update:  async function(req, res) {
        return res.ok('updated');
    },
    destory:  async function(req, res) {
        return res.ok('destory');
    }  
};

