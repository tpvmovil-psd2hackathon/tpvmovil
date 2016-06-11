module.exports = {
   checkUser,
   createToken
}

function checkUser (username, userPass) {
   //UserController.find(..)
   //TODO check password
   return User.findOne({username : 'pepe'})
}

function createToken (user, token) {
   return Token.create({user, token})
}
