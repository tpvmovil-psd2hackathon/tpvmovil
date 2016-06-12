module.exports = {
   checkUser,
   createToken
}

function checkUser (username, userPass) {
   //UserController.find(..)
   //TODO check password
   return User.findOne({username : 'pepe'})
}

function createToken (user, api_token) {
   return Token.create({user, api_token})
}
