CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER CHECK (age >= 0),
  breed Text NOT NULL,
  species TEXT NOT NULL,
  image TEXT,
  username VARCHAR(25)
    REFERENCES users ON DELETE SET NULL
);

CREATE TABLE applications (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  pet_id INTEGER
    REFERENCES pets ON DELETE CASCADE,
  PRIMARY KEY (username, pet_id)
);
