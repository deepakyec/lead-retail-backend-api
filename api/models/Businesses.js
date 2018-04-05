/**
 * Businesses.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: 'number',
      unique: true,
      autoIncrement: true
    },
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
      type: 'string'
    },  
    address: {
      type: 'string'
    },    
    locale: {
      type: 'string'
    },   
    timezone: {
      type: 'string'
    }, 
    total_credit_cents: {
      type: 'number'
    }, 
    sap_code: {
      required: true,
      type: 'string'
    },  
    tag: {
      type: 'string'
    },
    profile_data: {
      type: 'string'
    },  
    locality: {
      type: 'string'
    }, 
    contact_person: {
      type: 'string'
    },
    contact_person_number: {
      type: 'string'
    },
    otp: {
      type: 'string'
    },
    tnc_accepted: {
      type: 'string'
    },
    opco_id: {
      type: 'number'
    }, 
    region_id: {
      type: 'number'
    }, 
    language_id: {
      type: 'number'
    }, 
    is_super: {
      type: 'boolean',
      defaultsTo: false
    },  
    last_seen_at:false,
    created_at: { type: 'number', autoCreatedAt: true, }, 
    updated_at:{ type: 'number', autoUpdatedAt: true, },
  },
};

