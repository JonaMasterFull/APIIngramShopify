const axios = require("axios");
const fs = require("fs");


class Busqueda {
    url = './data/data.json'
    async buscarPrecios(url, data, config) {
        try {
        
        const resp = await axios.post(url, data, config); 
        console.log(resp.data);
        
        const precios = resp.data
        
        fs.writeFileSync(this.url, JSON.stringify(precios))
        // return {
        //     precio: pricing.customerPrice,
        //     sku : ingramPartNumber
        // }
        //  resp.data[0].pricing.customerPrice;
        } catch (error) {
            return [];
        }
    }

}

module.exports = {
    Busqueda
}
