const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var shortlyId = req.cookies.shortlyid;

  if (shortlyId) {
    models.Sessions.get({ hash: shortlyId })
      .then(result => {
        if (result) {
          return models.Users.get({ id: result.userId });
        } else {
          models.Sessions.create()
            .then(result => {
              return models.Sessions.get({ id: result.insertId });
            })
            .then(result => {
              res.cookies = { shortlyid: result.hash };
              next();
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .then(result => {
        if (result) {
          req.session = { hash: shortlyId, user: { username: result.username }, userId: result.id };
        } else {
          req.session = { hash: shortlyId };
        }
        next();
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    models.Sessions.create()
      .then(result => {
        return models.Sessions.get({ id: result.insertId });
      })
      .then(result => {
        req.session = { hash: result.hash };
        res.cookies = { shortlyid: { value: result.hash } };
        next();
      })
      .catch(err => {
        console.log(err);
      });
  }


  // var sessionPromise = models.Sessions.create();
  // var sessionObj = {};

  // req.session = sessionObj;
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {

};

