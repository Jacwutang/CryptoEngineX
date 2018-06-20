DROP DATABASE IF EXISTS CryptoEngineX_development;
CREATE DATABASE CryptoEngineX_development;


CREATE TABLE users (
  id PRIMARY KEY NOT NULL,
  email VARCHAR(65) NOT NULL,
  password_digest VARCHAR(65) NOT NULL

);
