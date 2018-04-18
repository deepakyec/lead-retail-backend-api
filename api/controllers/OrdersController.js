var hal = require('hal');

module.exports={
    show: async function(req,res) {
        let params = req.allParams();
        console.log("params=>",params);
        let order_id = params.fk;
        console.log("order_id=>",order_id);
        let order = await Orders.findOne({where:{id:order_id}})
        .populate('business');
        if(order){
            
            return res.ok(order);
        }
        return res.notfound({err:'order id does not exist'});
    }
}