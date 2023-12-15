import { describe, test, expect, beforeEach, afterEach, jest, beforeAll, afterAll, } from '@jest/globals';
import { ServerApp } from './presentation/server-app';

// process.argv = ["node", "app", "-b", "2"];
// import "./app";


describe("Test app.ts", () => {

  test("should call Server.run with values", async () => {
    // Arrange
    // Hago esto porque no me interesa probar el funcionamiento del ServerApp (Ya que eso lo testeo en el server)
    const serverRunMock = jest.fn();
    //.mockImplementation(() => { });->  Con esta ultima parte puedo hacer que la funcion haga algo en particular (o no haga nada, como lo que yo puse)
    ServerApp.run = serverRunMock;

    //preparo mi procedimiento...
    process.argv = ["node", "app", "-b", "2", "-l", "10", "-s", "-n", "test-destination", "-d", "test-filename"];

    // Act
    await import("./app"); // importo el archivo app.ts -> //! ESTO EJECUTA TODO EL PROCESO DE LA APP (por eso lo importo)

    // Assert
    expect(serverRunMock).toHaveBeenCalled();
    expect(serverRunMock).toHaveBeenCalledWith({
      base: 2,
      limit: 10,
      showTable: true,
      fileName: "test-destination",
      fileDestination: "test-filename"
    });






  });

});






