module.exports = {
   getPayment,
   putPayment,
   requestPayment
}


var rp = require('request-promise');
var q = require('q');

var consumerKey = 'r4yhegdmtgbj4gnzbaabg0eludveqd53zxtxgdvg';


function requestPayment(customer, hash) {
   return Payment.find({ where: { hash: hash }}).populate('user').then(function (paymentInfo) {
      var BANK_ID = customer.bank_id;
      var ACCOUNT_ID = customer.account_id;
      var VIEW_ID = "owner";
      var TRANSACTION_REQUEST_TYPE = "SANDBOX_TAN";

      var payload = {
         "to": {
            "bank_id": paymentInfo.user.bank_id,
            "account_id": paymentInfo.user.account_id
         },
         "value": {
            "currency": paymentInfo.currency,
            "amount": paymentInfo.amount
         },
         "description": paymentInfo.description
      }

      var options = {
         url: `https://apisandbox.openbankproject.com/banks/${BANK_ID}/accounts/${ACCOUNT_ID}/${VIEW_ID}/transaction-request-types/${TRANSACTION_REQUEST_TYPE}/transaction-requests`,
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         json: payload
      };

      return rp(options);
   });

}

function getPayment(hash) {
   //TODO remove sensitive data
   return Payment.findOne({hash}).populate('user')
}

function putPayment(payment){
   return Payment.create(payment)
}
