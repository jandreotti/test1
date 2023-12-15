import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";


// const { b } = yarg;


// console.log('base: ', b);


//! IIFE: Immediately Invoked Function Expression
(//! agrego esto 
  async () => {
    await main();
  }
)(); //! y esto para que se ejecute la funcion


async function main() {

  // console.log(yarg);
  const { b: base, l: limit, s: showTable, n: fileName, d: fileDestination } = yarg;
  ServerApp.run({
    base,
    limit,
    showTable,
    fileName,
    fileDestination
  });

}

