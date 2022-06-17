const chunks = require('chunk-array').chunks
const { Busqueda } = require('./helpers/busquedad');
const { Config } = require('./models/config');
const { sku } = require('./models/skus');
const axios = require("axios");



const main = async () => {

    const buscar = new Busqueda();
    const configRequest = new Config();

    const url = `https://api.ingrammicro.com:443/resellers/v6/catalog/priceandavailability`;
    const config =  await configRequest.configAxios();
    const products = chunks(sku, 50);

    for (const datos of products) {

        const data = {
            "products": datos
        }
        const precios = await buscar.buscarPrecios(url, data, config);

        console.log(precios);
    }
    // const dato = await buscar.buscarPrecios(codigo, '5322783');

}

main()