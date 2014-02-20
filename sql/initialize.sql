-- Create the database
CREATE SCHEMA `carpool_db` ;

-- Make the test table and add some values
CREATE  TABLE `carpool_db`.`test` (
  `id` INT NOT NULL ,
  `text` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) );

INSERT INTO `carpool_db`.`test` VALUES (1, 'martin');
INSERT INTO `carpool_db`.`test` VALUES (2, 'rishi');


-- Create email table and insert something
CREATE  TABLE `carpool_db`.`email` (
  `id` INT NOT NULL ,
  `email` VARCHAR(256) NULL ,
  PRIMARY KEY (`id`) );

INSERT INTO `carpool_db`.`email` VALUES (1, 'wozniew1@illinois.edu');

