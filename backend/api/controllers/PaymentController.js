module.exports = {
   putPayment,
   getPayment

};
var q = require('q')

function requestPayment (req, res) {
}

function getPayment (req, res) {
   q.spawn(function*(){
      try {
         var hash = req.body.hash
         //TODO check hash
         var response = yield PaymentService.getPayment(hash)
         res.send(response)
      } catch (e) {
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
         res.serverError()
      }
   })
}
