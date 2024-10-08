CREATE DATABASE GameStore507;
USE GameStore507;
CREATE TABLE users (
   user_id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   last_name VARCHAR(100) NOT NULL,
   profile_image VARCHAR(255),
   email VARCHAR(150) NOT NULL UNIQUE,
   province VARCHAR(100),
   user_type ENUM('cliente', 'administrador') NOT NULL,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE products (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   category VARCHAR(100),
   brand VARCHAR(100),
   model VARCHAR(100),
   specs1 VARCHAR(255),
   specs2 VARCHAR(255),
   specs3 VARCHAR(255),
   price DECIMAL(10, 2) NOT NULL,
   stock INT DEFAULT 100,
   description TEXT NOT NULL,
   image VARCHAR(255),
   image1 VARCHAR(255),
   image2 VARCHAR(255),
   image3 VARCHAR(255),
   image4 VARCHAR(255),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
USE GameStore507;
SHOW TABLES;
SELECT * FROM Users;
SELECT * FROM Products;
SHOW CREATE TABLE products;
ALTER TABLE products CHANGE id id INT NOT NULL AUTO_INCREMENT;
SELECT id, name, price FROM Products;
SELECT id, name, price FROM Products;
SHOW CREATE TABLE Users;
ALTER TABLE Users MODIFY COLUMN user_id BIGINT NOT NULL AUTO_INCREMENT;
SELECT * FROM Products WHERE category = 'computadoras';
