INSERT INTO `carpool_db`.`ride` (`id`, `email`, `confirmed`, `startLocation`, `endLocation`, `seats`, `seatPrice`, `departureTime`) VALUES
  (1, 'wozniew1@illinois.edu', 1, 'University of Illinois at Urbana-Champaign', 'O\'Hare International Airport', 4, 20, "2014-03-12T20:50:48.000Z"),
  (2, 'gli24@illinois.edu', 0, 'University of Illinois at Urbana-Champaign', 'O\'Hare International Airport', 4, 20, "2014-03-12T20:50:48.000Z"),
  (3, 'kshu2@illinois.edu', 1, 'Naperville', 'University of Illinois at Urbana-Champaign', 4, 25, "2014-03-15T20:50:48.000Z"),
  (4, 'bajekal1@illinois.edu', 0, 'Naperville', 'University of Illinois at Urbana-Champaign', 4, 25, "2014-03-15T20:50:48.000Z"),
  (5, 'sbhttch2@illinois.edu', 1, 'University of Illinois at Urbana-Champaign', 'O\'Hare International Airport', 3, 30, "2014-03-10T20:50:48.000Z"),
  (6, 'slee117@illinois.edu', 0, 'University of Illinois at Urbana-Champaign', 'O\'Hare International Airport', 3, 30, "2014-03-10T20:50:48.000Z"),
  (7, 'wyang15@illinois.edu', 1, 'O\'Hare International Airport', 'University of Illinois at Urbana-Champaign', 5, 40, "2014-03-10T20:50:48.000Z");



INSERT INTO `carpool_db`.`rider` (`ride_id`, `email`) VALUES
  (1, 'gli24@illinois.edu'),
  (1, 'bajekal1@illinois.edu'),
  (1, 'wyang15@illinois.edu'),
  (1, 'test@test.edu');

INSERT INTO `carpool_db`.`feedback` (`from`, `to`, `ride_id`, `comment`, `score`) VALUES
  ('gli24@illinois.edu', 'wozniew1@illinois.edu', 1, 'good ride!', 5),
  ('bajekal1@illinois.edu', 'wozniew1@illinois.edu', 1, 'hello!', 4);

INSERT INTO `carpool_db`.`token` (`ride_id`, `token`, `created`) VALUES
  (1, 'ride1', '2014-03-15T20:50:48.000Z'),
  (2, 'ride2', '2014-03-15T20:50:48.000Z'),
  (3, 'ride3', '2014-03-15T20:50:48.000Z'),
  (4, 'ride4', '2014-03-15T20:50:48.000Z'),
  (5, 'ride5', '2014-03-15T20:50:48.000Z'),
  (6, 'ride6', '2014-03-15T20:50:48.000Z'),
  (7, 'ride7', '2014-03-15T20:50:48.000Z');
