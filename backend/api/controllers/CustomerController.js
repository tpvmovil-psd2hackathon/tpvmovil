module.exports = {
   loginCustomer
};


function loginCustomer(req, res) {
   console.log("LOGIN");
   CustomerService.getCustomerToken(req.body.customerName, req.body.customerPass).then(function (data) {
      res.send(data)
   }).catch(function (e) {
      res.badRequest("Bad username/password");
   })
}
