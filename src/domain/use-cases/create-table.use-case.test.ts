import { describe, test, expect } from '@jest/globals';
import { CreateTable } from './create-table.use-case';

describe("CreateTableUseCase", () => {

  test("should create table with default values", () => {
    // Arrange
    const createTable = new CreateTable();

    // Act
    const table = createTable.execute({ base: 2 });
    const rows = table.split('\n');


    // Assert
    // expect(table).toBe(`2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20\n`);
    expect(table).toContain('2 x 1 = 2');
    expect(table).toContain('2 x 2 = 4');

    expect(rows.length).toBe(10);

  });


  test("should create table with custom values", () => {
    // Arrange
    const createTable = new CreateTable();
    const options = { base: 3, limit: 20 };

    // Act
    const table = createTable.execute(options);
    const rows = table.split('\n');

    // Assert
    expect(table).toContain('3 x 1 = 3');
    expect(table).toContain('3 x 12 = 36');
    expect(table).toContain('3 x 20 = 60');

    expect(rows.length).toBe(20);


  });

});





