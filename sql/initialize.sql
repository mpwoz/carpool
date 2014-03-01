-- Create the database
DROP SCHEMA `carpool_db`;
CREATE SCHEMA IF NOT EXISTS `carpool_db`;

-- Create ride table (TODO just emails for Iter 3, for Iter 4 we'll need other stuff)
-- DROP TABLE `carpool_db`.`ride`;
CREATE TABLE IF NOT EXISTS `carpool_db`.`ride` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL ,
  `confirmed` TINYINT NULL DEFAULT 0,
  `created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) );

INSERT INTO `carpool_db`.`ride` (`email`) VALUES ('wozniew1@illinois.edu');

