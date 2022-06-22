const chunks = require('chunk-array').chunks
const { Config } = require('./models/config');
const { sku } = require('./models/skus');
const { Obtener } = require('./models/obtener-prices');
const { ShopyIds } = require('./models/obtener-idSH');
const { ActualizarPrecios } = require('./models/actualizarSH');

const main = async () => {

    const configRequest = new Config();
    const prices = new Obtener();
    const shids = new ShopyIds();
    const actualizar = new ActualizarPrecios();


    const url = `https://api.ingrammicro.com:443/resellers/v6/catalog/priceandavailability`;
    const config =  await configRequest.configAxios();
    
    const valor = await prices.pricesIngram(url,sku,config)

    const arr = await shids.ObtenerArreglo()

    const actualizado = await actualizar.ActualizarPrecios(valor, arr);

    console.log(actualizado);

}

main()