\echo 'Delete and recreate petFinder db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE petFinder;
CREATE DATABASE petFinder;

\connect petFinder
\db

\i petFinder-schema.sql
\i petFinder-seed.sql

\echo 'Delete and recreate petfinder_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE petFinder_test;
CREATE DATABASE petFinder_test;
\connect petFinder_test

\i petFinder-schema.sql
