"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /", function () {
  test("ok for admin", async function () {
    const resp = await request(app)
        .post(`/jobs`)
        .send({
          name: "p4",
          age: 5,
          breed: "b3",
          species: "s5",
          user: "u1",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      pet: {
        id: expect.any(Number),
        name: "p4",
        age: 5,
        breed: "b3",
        species: "s5",
        user: "u1"
      },
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app)
        .post(`/pets`)
        .send({
          name: "p4",
          age: 5,
          breed: "b3",
          species: "s5",
          user: "u1"
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post(`/pets`)
        .send({
          user: "u1",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post(`/pets`)
        .send({
          name: "p4",
          age: "not a number",
          breed: "b3",
          species: "s5",
          user: "u1"
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

});

/************************************** GET /pets */

describe("GET /pets", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get(`/pets`);
    expect(resp.body).toEqual({
          pets: [
            {
              id: expect.any(Number),
              name: "p1", 
              age: 1, 
              breed: "b1", 
              species: "s1", 
              user: "u1"
            },
            {
              id: expect.any(Number),
              name: "p2", 
              age: 2, 
              breed: "b2", 
              species: "s2", 
              user: "u2"
            },
            {
              id: expect.any(Number),
              name: "p3", 
              age: 3, 
              breed: "b3", 
              species: "s3", 
              user: "u3"
            },
          ],
        },
    );
  });
})



 

/************************************** GET /pets/:id */

describe("GET /pets/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/jobs/${testJobIds[0]}`);
    expect(resp.body).toEqual({
      job: {
        id: testPetIds[0],
        name: "p1", 
        age: 1, 
        breed: "b1", 
        species: "s1", 
        user: "u1"
      },
    });
  });

  test("not found for no such pet", async function () {
    const resp = await request(app).get(`/pets/0`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /pets/:id */

describe("PATCH /pets/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .patch(`/pets/${testPetIds[0]}`)
        .send({
          name: "P-New",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      pet: {
        id: expect.any(Number),
        name: "P-New",
        age: 1,
        breed: "p1",
        species: "s1",
        user: "u1"
      },
    });
  });

  test("unauth for others", async function () {
    const resp = await request(app)
        .patch(`/pets/${testPetIds[0]}`)
        .send({
          name: "P-New",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such job", async function () {
    const resp = await request(app)
        .patch(`/pets/${testPetIds[0]}`)
        .send({
          name: "P-New",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on handle change attempt", async function () {
    const resp = await request(app)
        .patch(`/pets/${testPetIds[0]}`)
        .send({
          name: "P-New",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .patch(`/pets/${testPetIds[0]}`)
        .send({
          age: "not a number",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /pets/:id */

describe("DELETE /pets/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .delete(`/pets/${testPetIds[0]}`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: testJobIds[0] });
  });

  test("unauth for others", async function () {
    const resp = await request(app)
        .delete(`/pets/${testPetIds[0]}`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/pets/${testPetIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such pet", async function () {
    const resp = await request(app)
        .delete(`/pets/5`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
