module.exports = {
   putPayment,
   getPayment,
   requestPayment
};

var q = require('q')

function requestPayment (req, res) {
   //console.log(req.token)
   PaymentService.requestPayment(req.body.customer, req.body.hash, req.token.api_token).then(function (data) {
      res.send(data);
   }).catch(function (e) {
      res.badRequest();
   });
}

function getPayment (req, res) {
   q.spawn(function*(){
      try {
         console.log(req.query)
         var payment = yield PaymentService.getPayment(req.query.hash)
         res.send(payment)
      } catch (e) {
         console.error(e)
         res.serverError()
      }
   })
}

function putPayment(req, res){
   q.spawn(function*(){
      try {
         var payment = req.body.payment
         payment.user = req.user
         //TODO check payment
         yield PaymentService.putPayment(payment)
         res.created()
      } catch (e){
         console.error(e)
         res.serverError()
      }
   })
}
