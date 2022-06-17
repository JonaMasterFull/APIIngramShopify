require('dotenv').config()

class Config {


    get paramsPriceAvailability(){
        return {
            'includeAvailability': false,
            'includePricing': true,
            'includeProductAttributes' : false
        }
    }

    async configAxios(){
        let ajustes = {
            headers: {
                'IM-CustomerNumber': '323774', 
                'IM-CountryCode': 'CO', 
                'IM-CorrelationID': 'fbac82ba-cf0a-4bcf-fc03-0c5084', 
                'Authorization': `Bearer ${ process.env.TOKEN }`,
                'Accept': 'application/json'
            } ,
            params: this.paramsPriceAvailability
        }

        return ajustes;
    }
}

module.exports = {
    Config
}