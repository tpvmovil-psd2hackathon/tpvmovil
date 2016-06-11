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

module.exports.bootstrap = function(cb) {
   //Create mock user
   User.create({
      username : 'pepe',
      pass : 'pepe',
      name : 'Pepe',
      lastName : 'Gotera',
      company : 'Pepe Gotera Inc',
      bank_id : 'nordeaab',
      account_id : 'DE79110100200000129917',
   }).exec(function(err, created){/*console.log(err, created)*/})
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
