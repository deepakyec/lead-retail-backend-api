/**
	Generated by sails-inverse-model
	Date:Sat Apr 14 2018 13:40:41 GMT+0530 (India Standard Time)
*/

module.exports = {
    attributes: {
       
        full_name: {
            type: 'string',
            required: true
        },
        business: {
            model:'Businesses',
            columnName:'business_id',
            required:true
        },
        credit_cents: {
            type: 'number',
            defaultsTo: 0           
        },
        deleted_at: {
            type: 'string',
            required: false,
            allowNull: true
        },
        customer_address: {
            type: 'string',
            required: false,
            allowNull: true
        },
        customer_locality: {
            type: 'string',
            required: false,
            allowNull: true
        },
        customer_email: {
            type: 'string',
            required: false,
            allowNull: true
        },
        customer_phone: {
            type: 'string',
            required: false,
            allowNull: true
        }
    }
};