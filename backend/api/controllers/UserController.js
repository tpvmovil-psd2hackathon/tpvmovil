module.exports = {
   login
}
var q = require('q')

function login(req, res){
   q.spawn(function*(){
      try {
         var user = yield UserService.findOne(req.body.username, req.body.pass)
         res.ok()
      } catch (e){
         console.error(e)
         res.serverError()
      }
   })
}
