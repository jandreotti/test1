import { yarg } from "./config/plugins/args.plugin";
import fs from "fs";

const { b: base, s: showTable, l: limit } = yarg;



//**************************************************************************
let tabla = "";
tabla += "==============================\n";
tabla += `          Tabla del ${base}\n`;
tabla += "==============================\n\n";

for (let i = 1; i <= limit; i++) {
  tabla += `${base} x ${i} = ${base * i}\n`;
}

// creo carpeta si no existe
fs.mkdirSync('outputs', { recursive: true });

// grabo el archivo
fs.writeFileSync(`outputs/tabla-${base}.txt`, tabla, { encoding: "utf-8" });

// imprimo en consola
if (showTable) console.log(tabla);





// grabar en el archivo de salida
// path: outputs/tabla-5.txt



