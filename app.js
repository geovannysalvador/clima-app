require('dotenv').config()
const {inquirerMenu, pausa, leerInput, listaTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas.js');


const main = async() => {

    let opt;
    const busqueda = new Busquedas();

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ingrese la ciudad a buscar:');
                await busqueda.ciudad(lugar)
                // Buscar lugares
                // Seleccionar lugar
                // Clima
                // Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('');
                console.log('');
                console.log('');
                console.log('');
                console.log('');
                console.log('');
                
            break;
            
            case 2:
                
            break;
            
            case 3:
                
            break;
        

        }

        if (opt !==0) await pausa();



    } while (opt !== 0);



}

main();





