/*
 * Serve JSON to our AngularJS client
 */
exports.emails = function (req, res) {
  res.json({ 
    emails: ['martin.woz@gmail.com', 'wozniew1@illinois.edu']
  });
}
