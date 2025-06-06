"use strict";

/** Routes for pets. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Pet = require("../models/pet");
const petNewSchema = require("../schemas/petNew.json");
const petUpdateSchema = require("../schemas/petUpdate.json");


const router = express.Router({ mergeParams: true });


/** POST / { pet } => { pet }
 *
 * pet should be { name, age, breed, species, user }
 *
 * Returns { id,  name, age, breed, species, user}
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, petNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const pet = await Pet.create(req.body);
    return res.status(201).json({ pet });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { pets: [ { id, name, age, breed, species,image, user}, ...] }
 *
 

 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const p = req.query
  try {
 
    const pets = await Pet.findAll();
    return res.json({ pets });
  } catch (err) {
    return next(err);
  }
});

/** GET /[petId] => { pet }
 *
 * Returns { id, name, age, breed, species,image, user }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const pet = await Pet.get(req.params.id);
    return res.json({ pet });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[petId]  { fld1, fld2, ... } => { pet }
 *
 * Data can include: { name, age }
 *
 * Returns { id, name, age, breed, species, image, user }
 *
 * Authorization required: admin
 */

router.patch("/:id", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, petUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const pet = await Pet.update(req.params.id, req.body);
    return res.json({ pet });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
  try {
    await Pet.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
