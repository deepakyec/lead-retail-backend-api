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
      type:'number',
      allowNull: true
    },
    sold_to_party_code: {
      type:'number',
      allowNull: true
    },
    ars_sap_code: {
      type:'string',
      allowNull: true
    },
    material_code: {
      type:'string',
      allowNull: true   
    },
    // material_code_products: {
    //   // model: 'Lh_Products',
    //   // via: 'material_code'
    //   collection: 'Lh_Products', 
    //   via: 'material_code'
    // },
    quantity_tonnes: {
      type:'number',
      allowNull: true
    },
    quantity_bags: {
      type:'number',
      allowNull: true
    },
    points: {
      type:'number',
      allowNull: true
    },
    order_created_at: {
      type:'string',
      allowNull: true
    },
    branch_code: {
      type:'string',
      allowNull: true
    },
    truck_no: {
      type:'string',
      allowNull: true
    },
    batch_no: {
      type:'number',
      allowNull: true
    },
    source: {
      type:'string',
      allowNull: true
    },
    added_by: {
      type:'number',
      allowNull: true
    },
    status: {
      type:'number',
      allowNull: true
    },
    default_quantity_bags: {
      type:'number',
      allowNull: true
    },
    note: {
      type:'string',
      allowNull: true
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

