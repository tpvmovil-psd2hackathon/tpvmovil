module.exports = {
   login,
}

function login (username, userPass) {
   //UserController.find(..)
   //TODO check password
   return User.findOne({username : 'pepe'})
}
