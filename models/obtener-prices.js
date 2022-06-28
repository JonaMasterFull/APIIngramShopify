const chunks = require('chunk-array').chunks
const axios = require("axios");
const fs = require("fs");

class Obtener {
    arrays = [];
    guardarurl = './data/data.json';

    constructor(){

    }

    async pricesIngram (url, sku, config){
        
        const products = chunks(sku, 50);
        for (const datos of products) {
            const data = {
                "products": datos
            }
            // const precios = await buscar.buscarPrecios(url, data, config);
            const resp = await axios.post(url, data, config); 
            resp.data.map(json => {
               const precios = json.pricing.customerPrice;
               const sku = json.ingramPartNumber;
               this.arrays.push({ "cost": precios, "sku": sku});
            })
        }
        fs.writeFileSync(this.guardarurl, JSON.stringify(this.arrays))

        return this.arrays;
    }
}

module.exports = {
    Obtener
}