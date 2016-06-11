module.exports = {
   login
}
var q = require('q')

function login(req, res){
   q.spawn(function*(){
      try {
         var user = yield UserService.checkUser(req.body.username, req.body.pass)
         var api_token = yield OpenBankService.getToken(user.api_user, user.api_pass)
         var token = yield UserService.createToken(user, api_token.token)
         res.json({token :token})
      } catch (e){
         console.error(e)
         res.serverError()
      }
   })
}
