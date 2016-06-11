module.exports = {
   putPayment,
   getPayment,
   requestPayment
};

var q = require('q')

function requestPayment (req, res) {
   PaymentService.requestPayment(req.body.customer, req.body.hash).then(function (data) {
      res.send(data);
   }).catch(function (e) {
      res.badRequest("Operation invalid");
   });
}

function getPayment (req, res) {
   q.spawn(function*(){
      try {
         var hash = req.query.hash
         //TODO check hash
         var response = yield PaymentService.getPayment(hash)
         res.send(response)
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
         //TODO check payment
         yield PaymentService.putPayment(payment)
         res.created()
      } catch (e){
         console.error(e)
         res.serverError()
      }
   })
}
