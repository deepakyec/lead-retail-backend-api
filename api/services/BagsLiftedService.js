module.exports = { 
   async calculate_points(req,UserId,CreatedFlag,OrderId)
   {
       let currentDataObj = {};
       let orderXesData = await Orders_Xes.findOne({
           id:OrderId
       })
       
        currentDataObj['order_created_at'] = (CreatedFlag == -1) ? new Date(orderXesData.order_created_at) : new Date(req.params.order_created_at);
        currentDataObj['quantity_bags'] = (CreatedFlag == -1) ? orderXesData.quantity_bags : req.params.quantity_bags;

        startDate =  new Date( sails.config.globals.moment(currentDataObj.order_created_at).startOf('month').add(1,'day') );
        endDate = new Date(sails.config.globals.moment().endOf('month'));



        totalLiftingInMonthCollection = (CreatedFlag == false) ? await Orders_Xes.find({
            business_id:UserId,
            id: { '!=' : OrderId },
            created_at:  { 
                '>': startDate,
                '<': endDate }    
        }) : await Orders_Xes.find({
            business_id:UserId,
            created_at:  { 
                '>': startDate,
                '<': endDate }    
        });

        let totalLiftingInMonth = 0;        
        for(let i =0; i < totalLiftingInMonthCollection.length ; i++)
        {
            totalLiftingInMonth += totalLiftingInMonthCollection[i].quantity_tonnes;
        }

        if(CreatedFlag == -1)
        {
            totalLiftingInMonth = Number(totalLiftingInMonth);
        }
        else
        {
            totalLiftingInMonth = Number(totalLiftingInMonth) + (Number(currentDataObj.quantity_bags) * 50) / 100;
        }

        let pointsPerBag = 0.00;
        if(totalLiftingInMonth < 10)
        {
            pointsPerBag = 0.00;
        }
        else if(totalLiftingInMonth  >= 10 && totalLiftingInMonth <= 29.99)
        {
            pointsPerBag = 4.00;
        }
        else if(totalLiftingInMonth >= 30 && totalLiftingInMonth <= 49.99)
        {
            pointsPerBag = 5.00;
        }
        else if(totalLiftingInMonth >= 50 && totalLiftingInMonth <= 74.99)
        {
            pointsPerBag = 5.50;
        }
        else if(totalLiftingInMonth > 75.99 && totalLiftingInMonth <= 99.99)
        {
            pointsPerBag = 6.00;
        }
        else
        {
            pointsPerBag = 0.0;
        }

        for(let j = 0; j < totalLiftingInMonthCollection.length ; j++)
        {
            //currentPointsEstimated = totalLiftingInMonthCollection[j].quantity_bags * pointsPerBag;
            let attributes = {};
            attributes['points'] = totalLiftingInMonthCollection[j].quantity_bags * pointsPerBag;
            let UpdateResult = await Orders_Xes.update({ id:totalLiftingInMonthCollection[j].id },attributes).fetch();
        }

        pointsEstimated = Number(currentDataObj.quantity_bags) * pointsPerBag;
        return points_estimated;
   }

}
