const fs = require("fs");
const axios = require('axios');
const chunks = require('chunk-array').chunks

class ActualizarPrecios{
    static guardarurl = './data/data3.json';

    async ActualizarPrecios(costo, ids){
        let putPrices = costo.map((item) => {
            const id = ids.find(prod => item.sku === prod.sku).id
            
            if(typeof id === 'undefined'){
                return {   
                        id: 'null',
                        cost: item.cost                        
                    }
            } 
            return {
                id: id,
                cost: item.cost
            }
        });
        fs.writeFileSync(this.guardarurl, JSON.stringify(putPrices))
        return putPrices;
    }

    async PutShopifyCost(data, config){
        let i = 0;
        const products = chunks(data, 1);

         for (const value of products) {
 
            const id = value[0].id;
            const cost = value[0].cost;
            const data = JSON.stringify({
                "inventory_item": {
                    "id": `${ id }`,
                    "cost": `${ cost }`
                }
            })

            const resp = await axios.put(`https://brightmanstore.myshopify.com/admin/api/2022-04/inventory_items/${ id }.json`, data, config);
            i++;
        }
        return `Actualizados ${ i }`
        
    }
}

module.exports = {
    ActualizarPrecios
}