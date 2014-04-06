INSERT INTO `carpool_db`.`ride` (`email`, `confirmed`, `startLocation`, `endLocation`, `seats`, `seatPrice`, `departureTime`) VALUES
  ('wozniew1@illinois.edu', 1, 'University of Illinois at Urbana-Champaign', 'O\'Hare International Airport', 4, 20, "2014-03-12T20:50:48.000Z"),
  ('gli24@illinois.edu', 0, 'University of Illinois at Urbana-Champaign', 'O\'Hare International Airport', 4, 20, "2014-03-12T20:50:48.000Z"),
  ('kshu2@illinois.edu', 1, 'Naperville', 'University of Illinois at Urbana-Champaign', 4, 25, "2014-03-15T20:50:48.000Z"),
  ('bajekal1@illinois.edu', 0, 'Naperville', 'University of Illinois at Urbana-Champaign', 4, 25, "2014-03-15T20:50:48.000Z"),
  ('sbhttch2@illinois.edu', 1, 'University of Illinois at Urbana-Champaign', 'O\'Hare International Airport', 3, 30, "2014-03-10T20:50:48.000Z"),
  ('slee117@illinois.edu', 0, 'University of Illinois at Urbana-Champaign', 'O\'Hare International Airport', 3, 30, "2014-03-10T20:50:48.000Z"),
  ('wyang15@illinois.edu', 1, 'O\'Hare International Airport', 'University of Illinois at Urbana-Champaign', 5, 40, "2014-03-10T20:50:48.000Z");



INSERT INTO `carpool_db`.`rider` (`ride_id`, `email`) VALUES
  (1, 'gli24@illinois.edu'),
  (1, 'bajekal1@illinois.edu'),
  (1, 'wyang15@illinois.edu');

INSERT INTO `carpool_db`.`feedback` (`from`, `to`, `ride_id`, `comment`, `score`) VALUES
  ('gli24@illinois.edu', 'wozniew1@illinois.edu', 1, 'good ride!', 5),
  ('bajekal1@illinois.edu', 'wozniew1@illinois.edu', 1, 'hello!', 4);