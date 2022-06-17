const chunks = require('chunk-array').chunks
const { Config } = require('./models/config');
const { sku } = require('./models/skus');
const axios = require("axios");
const fs = require("fs");


const main = async () => {

    let arrays = [];
    const configRequest = new Config();
    const guardarurl = './data/data.json'
    const url = `https://api.ingrammicro.com:443/resellers/v6/catalog/priceandavailability`;
    const config =  await configRequest.configAxios();
    const products = chunks(sku, 50);

    console.log(products);
    for (const datos of products) {

        const data = {
            "products": datos
        }
        // const precios = await buscar.buscarPrecios(url, data, config);
        const resp = await axios.post(url, data, config); 
        resp.data.map(json => {
           const data = json.pricing.customerPrice;
           arrays.push(data);
        })
    }
    fs.writeFileSync(guardarurl, JSON.stringify(arrays))
    // const dato = await buscar.buscarPrecios(codigo, '5322783');

}

main()