module.exports = {


    friendlyName: 'Getquote',


    description: 'Getquote something.',


    inputs: {
        m1sid: {
            type: 'string',
            description: 'Special identifier for the property',
            required: true
        },
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Status of application'
        },
        invalid: {
            statusCode: 400,
            description: 'Invalid input'
        }
    },


    fn: async function (inputs, exits) {
        let incQuote = await Incquotes.findOne({ m1sid: inputs.m1sid });
        if (incQuote) {
            return exits.success({ incQuote, message: 'Quote found' })
        } else {
            return exits.invalid({ message: 'Unable to find quote for the given property' })
        }
    }


};
