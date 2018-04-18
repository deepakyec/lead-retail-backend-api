module.exports = function customRes(halData){
    
      //var req = this.req;
      var res = this.res;
      //var sails = req._sails;
      res.set('Content-Type', 'application/hal+json');
      
      //console.log("sails======>",sails);
    
      // var newError = new Error('Insufficient funds');
      // newError.raw = err;
      // _.extend(newError, extraInfo);
    
      // sails.log.verbose('Sent "Insufficient funds" response.');
    
      // return res.badRequest(newError);
      return res.ok(halData);
    
}