module.exports = {
   getPayment,
   putPayment,
   requestPayment
}


var rp = require('request-promise');
var q = require('q');

var consumerKey = 'r4yhegdmtgbj4gnzbaabg0eludveqd53zxtxgdvg';


function requestPayment(customer, hash, api_token) {
   return Payment.find({ where: { hash: hash }}).populate('user').then(function (paymentInfos) {

      var paymentInfo = paymentInfos[0];

      console.log(customer, hash, paymentInfo);

      var BANK_ID = customer.bank_id;
      var ACCOUNT_ID = customer.account_id;
      var VIEW_ID = "accountant"//"owner";
      var TRANSACTION_REQUEST_TYPE = "SANDBOX_TAN";

      // var payload = {
      //    "to": {
      //       "bank_id": paymentInfo.user.bank_id,
      //       "account_id": paymentInfo.user.account_id
      //    },
      //    "value": {
      //       "currency": paymentInfo.currency,
      //       "amount": paymentInfo.amount
      //    },
      //    "description": paymentInfo.description
      // }

      var payload = {
         "bank_id": paymentInfo.user.bank_id,
         "account_id": paymentInfo.user.account_id,
         "amount": paymentInfo.amount +""
      }

      var options = {
         url: `https://apisandbox.openbankproject.com/obp/v2.0.0/banks/${BANK_ID}/accounts/${ACCOUNT_ID}/${VIEW_ID}/transactions`,
            //`https://apisandbox.openbankproject.com/obp/v2.0.0/banks/${BANK_ID}/accounts/${ACCOUNT_ID}/${VIEW_ID}/transaction-request-types/${TRANSACTION_REQUEST_TYPE}/transaction-requests`,
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'DirectLogin token=' + api_token
         },
         json: payload
      };

      console.log(options.url);

      return rp(options);
   });

}

function getPayment(hash) {
   //TODO remove sensitive data
   return Payment.findOne({hash}).populate('user')
}

function putPayment(payment){
   var hash = parseInt(Math.random()*1000000000000000).toString(16)
   payment.hash = hash
   return Payment.create(payment)
}
