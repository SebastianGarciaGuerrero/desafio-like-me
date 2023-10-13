CREATE TABLE posts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo        VARCHAR(25) NOT NULL,
  img           VARCHAR(1000) NOT NULL,
  descripcion   VARCHAR(255) NOT NULL,
  likes         INT NULL
);
