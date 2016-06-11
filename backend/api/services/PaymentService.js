module.exports = {
   getPayment,
   putPayment
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
