CREATE DATABASE thesupercoderdb ;

CREATE TABLE data_table(
    user_id     SERIAL PRIMARY KEY,
    content     VARCHAR(225)    NOT NULL
);

-- CREATE TABLE user_table(
--     user_id SERIAL PRIMARY KEY,
--     user_email VARCHAR(225),
--     user_password VARCHAR(225)
-- );