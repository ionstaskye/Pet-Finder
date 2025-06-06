"use strict";

const { NotFoundError, BadRequestError } = require("../expressError.js");
const db = require("../db.js");
const Pet = require("./pet.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
} = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  let newPet = {
    name: "p1",
    species: "Test",
    breed: "test",
    age: 5,
    user: "test"
  };

  test("works", async function () {
    let pet = await Pet.create(newPet);
    expect(pet).toEqual({
      ...newPet,
      id: expect.any(Number),
    });
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let pets = await Pet.findAll();
    expect(pets).toEqual([
      {
        id: testPetIds[0],
        name: "Pet1",
        age: 1,
        breed: "b1",
        species: "s1",
        user: "u1",
        userName: 'u1'
      },
      {
        id: testPetIds[1],
        name: "Pet2",
        age: 2,
        breed: "b2",
        species: "s2",
        user: "u2",
        userName: 'u2'
      },
      {
        id: testPetIds[2],
        name: "Pet3",
        age: 3,
        breed: "b3",
        species: "s3",
        user: "u1",
        userName: 'u1'
      },
      {
        id: testPetIds[3],
        name: "Pet4",
        age: 4,
        breed: "b4",
        species: "s4",
        user: "u2",
        userName: 'u2'
      },
    ]);
  });
})
  
/************************************** get */

describe("get", function () {
  test("works", async function () {
    let pet = await Pet.get(testJobIds[0]);
    expect(pet).toEqual({
      id: testPetIds[0],
        name: "Pet1",
        age: 1,
        breed: "b1",
        species: "s1",
        owner: "u1",
    });
  });

  test("not found if no such pet", async function () {
    try {
      await Pet.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  let updateData = {
    name: "New",
    age: 5,
  };
  test("works", async function () {
    let pet = await Pet.update(testPetIds[0], updateData);
    expect(pet).toEqual({
      id: testPetIds[0],
      ...updateData,
      breed: "b1",
      species: "s1",
      owner: "u1",
    });
  });

  test("not found if no such pet", async function () {
    try {
      await Pet.update(0, {
        name: "test",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Pet.update(testPetIds[0], {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Pet.remove(testPetIds[0]);
    const res = await db.query(
        "SELECT id FROM pets WHERE id=$1", [testPetIds[0]]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such pet", async function () {
    try {
      await Pet.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
