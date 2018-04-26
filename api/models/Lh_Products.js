/**
 * Lh_Products.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string'
    },
    material_code: {
      type: 'string',
      // columnName:'material_code',
      // model: 'Orders_Xes',         
    },
    image_data: {
      type: 'string'
    },
    price_cents: {
      type: 'number'
    },
    position: {
      type: 'number'
    },
    status: {
      type: 'number'
    },
    websales_product_id: {
      type: 'number'
    },
    opco_id: {
      type: 'number'
    },
    branch_id: {
      model:'Branches'
    },
    product_type: {
      type: 'string'
    },
    // orders_data: {
    //   columnName:'material_code',
    //   model: 'Orders_Xes',         
    // }
    // _links: {
    //   type: 'json',
    //   defaultsTo: {
    //     "self":null
    //   }
    // }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

