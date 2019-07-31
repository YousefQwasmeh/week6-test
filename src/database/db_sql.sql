
BEGIN;

    DROP TABLE IF EXISTS city
    CASCADE;

CREATE TABLE city
(
    id SERIAL PRIMARY KEY,
    name VARCHAR (150) NOT NULL,
    country VARCHAR (150) NOT NULL
);

INSERT INTO city
    (name,country)
VALUES
    ('hebron', 'palestine'),
    ('gaza', 'palestine');

COMMIT;
