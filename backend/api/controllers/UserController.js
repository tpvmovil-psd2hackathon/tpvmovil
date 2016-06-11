module.exports = {
   loginCustomer
};


function loginCustomer(req, res) {
   console.log("LOGIN");
   LoginService.getUserToken(req.body.user, req.body.pass).then(function (data) {
      res.send(data)
   }).catch(function (e) {
      res.badRequest("Bad username/password");
   })
}
