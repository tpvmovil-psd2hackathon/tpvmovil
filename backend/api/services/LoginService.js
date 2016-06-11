var rp = require('request-promise');

var consumerKey = 'r4yhegdmtgbj4gnzbaabg0eludveqd53zxtxgdvg';

module.exports = {

   getUserToken: function (user, pass) {
      var options = {
         url: 'https://apisandbox.openbankproject.com/my/logins/direct',
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization':
               `DirectLogin username="${user}", password="${pass}", consumer_key="${consumerKey}"`
         }
      };

      return rp(options);
   }

};
