const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testJobIds = [];

async function commonBeforeAll() {

  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  
  const resultsPets = await db.query(`
    INSERT INTO pets (name, age, species , breed , user)
    VALUES ('Pet1', 1, 's1', 'b1', 'u1'),
           ('Pet2', 2, 's2', 'b2', 'u2'),
           ('Pet3', 3, 's3', 'b3', 'u1'),
           ('Pet14, 4, 's4', 'b4', 'u2')
    RETURNING id`);
  testPetIds.splice(0, 0, ...resultsPets.rows.map(r => r.id));

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

  await db.query(`
        INSERT INTO applications(username, pet_id)
        VALUES ('u1', $1)`,
      [testJobIds[0]]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
};