const axios = require('axios');
require('dotenv').config();
const chunks = require('chunk-array').chunks
const fs = require("fs");

class ShopyIds {
    guardarurl = './data/data2.json'

    async ObtenerArreglo(){
        const resp = await axios.get('https://brightmanstore.myshopify.com/admin/api/2022-04/products.json', { 
            headers: { 
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN
            },
            params: {
                'limit': 200
            }
        });

        const ids  = resp.data.products.map(product => {
            return { id: product.variants[0].inventory_item_id, sku:product.variants[0].sku }   
        });

        fs.writeFileSync(this.guardarurl, JSON.stringify(ids))

        
        return ids;
    }
}

module.exports = {
    ShopyIds
}