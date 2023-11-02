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

            const respuesta = await instance.get();
            console.log(respuesta.data);

            // Regresa todos los lugares
            return [];

        } catch (error) {
            return [];
        }




    }

}

module.exports = Busquedas;