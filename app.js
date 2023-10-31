
const {inquirerMenu, pausa, leerInput, listaTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer.js');


const main = async() => {
    const texto = await leerInput(' ingrese texto de prueba: ')
    console.log(texto);
}

main();





