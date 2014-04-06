-- Create the database
DROP SCHEMA IF EXISTS `carpool_db`;
CREATE SCHEMA IF NOT EXISTS `carpool_db`;

-- Create ride table (TODO just emails for Iter 3, for Iter 4 we'll need other stuff)
-- DROP TABLE `carpool_db`.`ride`;
CREATE TABLE IF NOT EXISTS `carpool_db`.`ride` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL ,
  `confirmed` TINYINT NULL DEFAULT 0,
  `startLocation` VARCHAR(255) NULL,
  `endLocation` VARCHAR(255) NULL,
  `seats` INT NULL DEFAULT 0,
  `seatPrice` INT NULL DEFAULT 0,
  `departureTime` VARCHAR(255) NULL,
  `created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) );

-- Verification tokens for email confirmations
CREATE TABLE IF NOT EXISTS `carpool_db`.`token` (
  `ride_id` INT NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP );


-- Table for riders (passengers) for each ride
CREATE TABLE IF NOT EXISTS `carpool_db`.`rider` (
  `ride_id` INT NOT NULL,
  `email` VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS `carpool_db`.`feedback` (
  `from` VARCHAR(255) NOT NULL,
  `to` VARCHAR(255) NOT NULL,
  `ride_id` INT NOT NULL,
  `comment` VARCHAR(255) NULL,
  `score` INT NULL);
