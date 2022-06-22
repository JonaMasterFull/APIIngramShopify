
class ActualizarPrecios{

    async ActualizarPrecios(costo, ids){
        for (const costos of costo) {
            for (const id of ids) {
                console.log(costos.sku);
            }
        }
    }
}

module.exports = {
    ActualizarPrecios
}