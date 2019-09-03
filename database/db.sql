CREATE DATABASE final_eco;

USE final_eco;

-- Users table
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    direccion VARCHAR(50) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);
   
ALTER TABLE users 
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


DESCRIBE users;

-- materiales tabla
CREATE TABLE materiales (
    id INT(11) NOT NULL,
    material VARCHAR(50) NOT NULL,
    descripcion TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT concurrent_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE materiales
    ADD PRIMARY KEY (id);

alter table materiales
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE materiales;