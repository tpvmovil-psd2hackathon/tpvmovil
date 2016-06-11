/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var q = require('q')
module.exports.bootstrap = function(cb) {
   q.spawn(function *() {
      try {
         //Create mock user
         var user = yield User.create({
            username : 'pepe',
            pass : 'pepe',
            name : 'Pepe',
            lastName : 'Gotera',
            company : 'Pepe Gotera Inc',
            bank_id : 'at03-bank-x',
            account_id : 'cd667972-c61e-42d5-971c-939f7ed6f8e1',
            api_pass : "eb615d",
            api_user : "alberto.segura.perez.x.x@example.com"
         })
         var payment  = yield Payment.create({
            hash : 'ada',
            amount : 40,
            currency : 'GBP',
            description : 'Something nice',
            user : user
         })
         console.log(payment)
         console.log(user)
      } catch (e){
         console.error(e)
      } finally {
         // It's very important to trigger this callback method when you are finished
         // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
         cb();
      }

   })

};
