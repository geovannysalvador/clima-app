const axios = require('axios');

class Busquedas {

    historial = ['Guatemala', 'Mexico', 'Bogota'];

    constructor(){
        // Leer la bd si existe
    }
    // Metodo para buscar una ciudad 

    async ciudad ( lugar = '' ){

        // Peticion HTTP con axios a la api
        const respuesta = await axios.get('https://reqres.in/api/users?page=2')
        console.log(respuesta.data);

        // Regresa todos los lugares
        return []; 
    }

}

module.exports = Busquedas;