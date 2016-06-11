/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
var q = require('q')
module.exports = function(req, res, next) {
   q.spawn(function*() {
      //TODO check token at redis
      if (true) {
         req.user = yield User.findOne()
         req.token = yield Token.findOne()
         return next();
      }

      // User is not allowed
      // (default res.forbidden() behavior can be overridden in `config/403.js`)
      return res.forbidden('You are not permitted to perform this action.');
   })

};
