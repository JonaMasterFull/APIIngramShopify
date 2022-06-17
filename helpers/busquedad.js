const axios = require("axios");

class Busqueda {
    url = `https://api.ingrammicro.com:443/resellers/v6/catalog/priceandavailability`
    constructor(){
    }

    get paramsPriceAvailability(){
        return {
            'includeAvailability': false,
            'includePricing': true,
            'includeProductAttributes' : false
        }
    }

    async buscarPrecios(token ,sku) {
        try {
        let body = {
            "products": [
                {
                    "ingramPartNumber": `${sku}`
                }
            ]
        }
        const resp = await axios.post(this.url, body,{
            headers: {
                'IM-CustomerNumber': '323774', 
                'IM-CountryCode': 'CO', 
                'IM-CorrelationID': 'fbac82ba-cf0a-4bcf-fc03-0c5084', 
                'Authorization': `Bearer ${ token }`,
                'Accept': 'application/json'
            } ,
            params: this.paramsPriceAvailability
        });
        const { pricing, ingramPartNumber } =  resp.data[0];


        return {
            precio: pricing.customerPrice,
            sku : ingramPartNumber
        }
        //  resp.data[0].pricing.customerPrice;
        } catch (error) {
            return [];
        }
    }

}

module.exports = {
    Busqueda
}
