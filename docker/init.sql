CREATE USER 'user'@'%' IDENTIFIED BY '7149';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';
ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY '7149';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS db;
USE db;
CREATE TABLE IF NOT EXISTS `user_details`(_id INT AUTO_INCREMENT PRIMARY KEY,
                                          `mail` VARCHAR(255) NOT NULL,
                                          `password` VARCHAR(255) NOT NULL)ENGINE=INNODB;