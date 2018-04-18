/**
	Generated by sails-inverse-model
	Date:Sat Apr 14 2018 13:40:41 GMT+0530 (India Standard Time)
*/

module.exports = {
    attributes: {
        
        business: {
            model:'Businesses',
            columnName:'business_id',
            required:true
        },
        customer: {
            model:'Customers',
            columnName:'customer_id',
            required:true
        },
        title: {
            type: 'string',
            required: true
        },
        is_taxed: {
            type: 'boolean',
            required: true
        },
        receipt_data: {
            type: 'string',
            required: true
        },
        total_cents: {
            type: 'number',
            required: true
        },
        deleted_at: {
            type: 'string',
            required: true
        },
        sold_at: {
            type: 'string',
            required: true
        },
        subtotal_cents: {
            type: 'number',
            required: true
        },
        tax_amount_cents: {
            type: 'number',
            required: true
        },
        credit_cents: {
            type: 'number',
            required: true
        },
        credit_outstanding_cents: {
            type: 'number',
            required: true
        },
        notes: {
            type: 'string',
            required: true
        },
        payment_received: {
            type: 'string',
            required: true
        }
    }
};