/**
 * Businesses.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // id: {
    //   type: 'number',
    //   unique: true,
    //   autoIncrement: true
    // },
    user_name: {
      required: true,
      type: 'string',
      unique: true
    },
    password_digest: {
      required: true,
      type: 'string'
    },
    name: {
      required: true,
      type: 'string'
    },
    phone: {
      required: true,
      type: 'string',
      unique: true
    }, 
    email: {
      type: 'string',
      allowNull:true
    },  
    address: {
      type: 'string',
      allowNull:true
    },    
    locale: {
      type: 'string',
      allowNull:true
    },   
    timezone: {
      type: 'string',
      allowNull:true
    }, 
    total_credit_cents: {
      type: 'number',
      allowNull:true
    }, 
    sap_code: {
      type: 'string',
      allowNull:true
    },  
    tag: {
      type: 'string',
      allowNull:true
    },
    profile_data: {
      type: 'string',
      allowNull:true
    },  
    locality: {
      type: 'string',
      allowNull:true
    }, 
    contact_person: {
      type: 'string',
      allowNull:true
    },
    otp: {
      type: 'string',
      allowNull:true
    },
    tnc_accepted: {
      type: 'boolean',
      allowNull:true
    },
    opco:{
      columnName:'opco_id',
      model:'Opcos',
      required:true
    },
    region:{
      columnName:'region_id',
      model:'Regions',
      required:true
    },
    language:{
      columnName:'language_id',
      model:'languages',
      required:true
    },
    is_super: {
      type: 'boolean',
      defaultsTo: false
    },  
    last_seen_at:false,
    products:{
      collection:'Products',
      via:'business'
    },
    orders:{
      collection:'Orders',
      via:'business'
    },
    customers:{
      collection:'Customers',
      via:'business'
    },
    sales:{
      collection:'Sales',
      via:'business'
    },
    digital_orders:{
      collection:'Digital_Orders',
      via:'business'
    }
    // created_at: { type: 'string', autoCreatedAt: true, }, 
    // updated_at:{ type: 'string', autoUpdatedAt: true, },
    
  },
};

