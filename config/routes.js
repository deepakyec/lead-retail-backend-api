/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  
  'GET /': 'ApplicationController.index', 
  'GET /business/:id': 'BusinessesController.index',
  //'post /businesses': 'BusinessesController.index',
  'POST /businesses/loginotprequest': 'BusinessesController.loginotprequest',
  'POST /businesses/verifyloginotp': 'BusinessesController.verifyloginotp',
  'GET /businesses/:parentid/orders/:fk': 'OrdersController.show',


  //------------Customer API----------------//
  'GET /credit/': 'BusinessesController.credit',
  'POST /business/:id/customers/' : 'CustomerController.create',
  'GET /businesses/:id/customers/:cust_id' : 'CustomerController.findOne',
  'PATCH /business/:business_id/customers/:cust_id': 'CustomerController.update',
  'POST /businesses/:business_id/customers/:cust_id/credits': 'CustomerController.credit',
  'GET /businesses/:business_id/lh_products': 'StockController.lhfind',
  'GET /businesses/:business_id/orders_xes': 'StockController.ordersXesFind'
  // 'post /businesses': 'BusinessesController.create',loginotprequest verifyloginotp
  // 'patch /businesses/:id': 'BusinessesController.update',
  // 'put /businesses/:id': 'BusinessesController.update',
  // 'destory /businesses/:id': 'BusinessesController.destory',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
