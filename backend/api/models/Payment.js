module.exports = {
   attributes : {
      hash : {
         type : 'string',
         required : true
      },
      amount : {
         type : 'float',
         required : true
      },
      currency : {
         type : 'string',
         required : false
      },
      description : {
         type : 'string',
         required : true
      },
      user: {
         model: 'User'
      }

   }

}
