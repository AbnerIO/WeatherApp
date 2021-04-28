require('dotenv').config()
const {  inquirerMenu,
    pausa,
    leerInput,
    listarLugares,} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main=async()=>{
    const busquedas = new Busquedas();
    let opt; 
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                console.log({opt})
                const termino = await leerInput("Ciudad : ");
                const lugares = await busquedas.ciudad(termino);
                const id=await listarLugares(lugares);
                if (id ==="0")continue;
                const lugarSel= lugares.find(e=> e.id===id)
                busquedas.agregarHistorial(lugarSel.nombre)
                const lon = lugarSel.lng
                const lat = lugarSel.lat
                const clima = await busquedas.climaLugar(lat, lon);

      
                console.log("\nInormación de la ciudad\n".green)
                console.log("Ciudad: ", lugarSel.nombre)
                console.log("Latitud: ", lugarSel.lat)
                console.log("Longitud: ",lugarSel.lng)
                console.log("Temperatura minima: ", clima.min + "°C")
                console.log("Temperatura máxima: ", clima.max + "°C")
                console.log("Estado del clima: ", clima.desc)
                
                break;
                case 2:
                    busquedas.historialCapitalizado.forEach((lugar,i)=>{
                            const idx=`${i+1}`.green;
                            console.log(`${idx}.- ${lugar}`)
                    })
                    break;
                }
                if ( opt!==0)await pausa();
    } while (opt !=0);
}
main();