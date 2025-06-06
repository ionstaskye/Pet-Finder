"use strict";
/** Database setup for petFinder. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///petFinder"
}
else {
  DB_URI = "postgres://postgres:abc@127.0.0.1:5432/petfinder"
}

let db = new Client({
  connectionString: DB_URI
})
db.connect()
module.exports = db;