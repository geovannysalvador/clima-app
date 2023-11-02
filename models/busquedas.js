const axios = require('axios');

class Busquedas {

    historial = ['Guatemala', 'Mexico', 'Bogota'];

    constructor() {
        // Leer la bd si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'lenguage': 'es',
        }   
    }

    // Metodo para buscar una ciudad 
    async ciudad(lugar = '') {

        try {
            // Peticion HTTP con axios a la api
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
            });

             // Regresa todos los lugares
            const respuesta = await instance.get();
            return respuesta.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud:  lugar.center[1],
            }));


        } catch (error) {
            return [];
        }




    }

}

module.exports = Busquedas;