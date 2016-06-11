module.exports = {
   getPayment,
   putPayment,
   requestPayment
}


var rp = require('request-promise');
var q = require('q');

var consumerKey = 'r4yhegdmtgbj4gnzbaabg0eludveqd53zxtxgdvg';


function requestPayment(customer, hash) {
   return Payment.find({ where: { hash: hash }}).populate('user').then(function (paymentInfos) {

      var paymentInfo = paymentInfos[0];

      console.log(customer, hash, paymentInfo);

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
         url: `https://apisandbox.openbankproject.com/obp/v1.4.0/banks/${BANK_ID}/accounts/${ACCOUNT_ID}/${VIEW_ID}/transaction-request-types/${TRANSACTION_REQUEST_TYPE}/transaction-requests`,
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'DirectLogin token=' + token
         },
         json: payload
      };

      console.log(options.url);

      return rp(options);
   });

}

function getPayment(hash) {
   //return Payment.find({hash})
   return new Promise(function(resolve, refuse){
      resolve({
         amount : '40',
         currency : 'EUR',
         description : 'Something nice'
      })
   })
}

function putPayment(payment){
   //return Payment.save(payment)
   return new Promise(function(resolve){resolve()})
}
