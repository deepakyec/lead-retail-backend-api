/**
 * Orders_Xes.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    business_id: {
      model:'Businesses'
    },
    do_number: {
      type:'number'
    },
    sold_to_party_code: {
      type:'number'
    },
    ars_sap_code: {
      type:'number'
    },
    material_code: {
      type:'number'
    },
    quantity_tonnes: {
      type:'number'
    },
    quantity_bags: {
      type:'number'
    },
    points: {
      type:'number'
    },
    order_created_at: {
      type:'string'
    },
    branch_code: {
      type:'string'
    },
    truck_no: {
      type:'string'
    },
    batch_no: {
      type:'number'
    },
    source: {
      type:'string'
    },
    added_by: {
      type:'number'
    },
    status: {
      type:'number'
    },
    default_quantity_bags: {
      type:'number'
    },
    note: {
      type:'string'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

