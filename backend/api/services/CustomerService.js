var rp = require('request-promise');

var consumerKey = 'r4yhegdmtgbj4gnzbaabg0eludveqd53zxtxgdvg';

module.exports = {

   getCustomerToken: function (customerName, customerPass) {
      var options = {
         url: 'https://apisandbox.openbankproject.com/my/logins/direct',
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization':
               `DirectLogin username="${customerName}", password="${customerPass}", consumer_key="${consumerKey}"`
         }
      };

      return rp(options);
   }

};
