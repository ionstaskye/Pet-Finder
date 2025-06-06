"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for pets. */

class Pet {
  /** Create a pet (from data), update db, return new pet data.
   *
   * data should be { name, age, breed, species, image, user }
   *
   * Returns { id, name, age, breed, species, image, user }
   **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO pets (name,
                             age,
                             breed,
                             species,
                             image,
                             user)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING id, name, age, breed, species, image, user"`,
        [
          data.name,
          data.age,
          data.breed,
          data.species,
          data.image,
          data.user
        ]);
    let pet = result.rows[0];

    return pet;
  }

  /** Find all pets 
   *
   * Returns [{ id,  name, age, breed, species, image, user}, ...]
   * */

  static async findAll() {
    let petsRes = await db.query(`SELECT id,
                        name,
                        age,
                        breed,
                        species,
                        image,
                        user
                  FROM pets
                  ORDER BY name
`);
    

    
    return petsRes.rows;
  }

  /** Given a pet id, return data about pet.
   *
   * Returns { id, name, age, breed, species, image, user }
   * 
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const petRes = await db.query(
          `SELECT id,
                  name,
                  age,
                  breed,
                  species,
                  image,
                  user AS "owner"
           FROM pets
           WHERE id = $1`, [id]);

    const pet = petRes.rows[0];

    if (!pet) throw new NotFoundError(`No pet: ${id}`);

    

    return pet;
  }

  /** Update pet data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { name, age }
   *
   * Returns { id, name, age, breed, species, user }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                name, 
                                age, 
                                breed,
                                species,
                                user`;
    const result = await db.query(querySql, [...values, id]);
    const pet = result.rows[0];

    if (!pet) throw new NotFoundError(`No pet: ${id}`);

    return pet;
  }

  /** Delete given pet from database; returns undefined.
   *
   * Throws NotFoundError if pet not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM pets
           WHERE id = $1
           RETURNING id`, [id]);
    const pet = result.rows[0];

    if (!pet) throw new NotFoundError(`No job: ${id}`);
  }
}

module.exports = Pet;
