const axios = require('axios');
module.exports = {


    friendlyName: 'Quote',


    description: 'Insurance Quote .',


    inputs: {
        m1sid: {
            type: 'string',
            description: 'Special identifier for the property',
            required: true
        },
        mortid: {
            type: 'string',
            description: 'Mort id given by MBR',
            required: true
        },
        appraisalValue: {
            type: 'number',
            description: 'Appraisal value by the realtor visit.'
        },
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Appraisal request created'
        },
        invalid: {
            statusCode: 400,
            description: 'Invalid input'
        }
    },


    fn: async function (inputs, exits) {
        let insuredValue = inputs.appraisalValue - Math.round(Math.random() * 100);
        let deductible = 0.1 * insuredValue; // 10 % is deductible

        let quote = {
            m1sid: inputs.m1sid,
            mortid: inputs.mortid,
            appraisalValue: inputs.appraisalValue,
            insuredValue: insuredValue,
            deductible: deductible
        };
        let createdQuote = await Incquotes.create(quote).fetch();

        try {
            let response = await axios.post('http://localhost:1337' + '/confirmation/insurance',
                _.pick(quote, 'mortid', 'm1sid', 'insuredValue', 'deductible'));
            return exits.success({ createdQuote, message: 'Quote sucessfully created' });
        } catch (e) {
            return exits.invalid({ message: 'Unable to contact MBR service.', error: e })
        }

    }


};
