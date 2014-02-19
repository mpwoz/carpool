-- Create the database
CREATE SCHEMA `carpool_db` ;

-- Make a table
CREATE  TABLE `carpool_db`.`test` (
  `id` INT NOT NULL ,
  `text` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) );

-- Insert some rows
INSERT INTO `carpool_db`.`test` VALUES (1, 'martin');
INSERT INTO `carpool_db`.`test` VALUES (2, 'rishi');

