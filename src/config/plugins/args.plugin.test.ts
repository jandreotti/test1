import { describe, test, expect, beforeEach, afterEach, jest, beforeAll, afterAll, } from '@jest/globals';



// Es una funcion que me va a permitir modificar mi argv de manera dinamica
// y cargarlos en el yargs
const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const defaultExport = await import('./args.plugin'); // importo de manera dinamica este archivo
  const { yarg } = defaultExport; // desestructuro el objeto yarg
  return yarg;
};





describe("Test args.plugin.ts", () => {

  // Este codigo es para evitar que se quede cacheado el argv // Cada vez que ejecuto el runCommand se agregan los argumentos. Con esto de aca abajo lo reseteo para que no se quede cacheado
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default values", async () => {
    // Arrange
    const argv = await runCommand(["-b", "5",]);
    // console.log(process.argv);
    // console.log({ argv });

    // Act

    // Assert
    expect(argv).toEqual(expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'multiplication-table',
      d: 'outputs',
    }));

  });

  test("should return configuration with custom values", async () => {

    // Arrange
    const argv = await runCommand(["-b", "10", "-l", "10", "-s", "-n", "multiplication-table-custom-name", "-d", "custom-dir"]);
    // console.log(process.argv);
    // console.log({ argv });

    // Act

    // Assert
    expect(argv).toEqual(expect.objectContaining({
      b: 10,
      l: 10,
      s: true,
      n: 'multiplication-table-custom-name',
      d: 'custom-dir',
    }));

  });

});
