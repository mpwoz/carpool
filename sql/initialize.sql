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


-- Create ride table (TODO just emails for Iter 3, for Iter 4 we'll need other stuff)
CREATE  TABLE `carpool_db`.`ride` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL ,
  `confirmed` TINYINT NULL DEFAULT 0,
  `created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) );

INSERT INTO `carpool_db`.`ride` (`email`) VALUES ('wozniew1@illinois.edu');
INSERT INTO `carpool_db`.`ride` (`email`) VALUES ('martin.woz@gmail.com');

