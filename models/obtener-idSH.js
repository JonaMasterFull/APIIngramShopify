const axios = require('axios');
require('dotenv').config();
const chunks = require('chunk-array').chunks
const fs = require("fs");

class ShopyIds {
    arrayID = [];
    guardarurl = './data/data2.json'

    async ObtenerArreglo(){
        const resp = await axios.get('https://brightmanstore.myshopify.com/admin/api/2022-04/products.json', { 
            headers: { 
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN
            },
            params: {
                'limit': 141
            }
        });

        const ids  = resp.data.products.map(product => {
            return { id: product.variants[0].inventory_item_id, sku:product.variants[0].sku }   
        });

        const products = chunks(ids, 50);
        for (const data of products) {

            this.arrayID.push(data);
            fs.writeFileSync(this.guardarurl, JSON.stringify(this.arrayID))
        }
        
        return this.arrayID;
    }
}

module.exports = {
    ShopyIds
}