import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  queryParams: ['hash'],
  hash: null,

  email: 'alberto.segura.castro.x.x@example.com',
  password: '361e09',

  displayHash: Ember.computed('hash', function () {
    return this.get('hash');
  }),

  actions: {
    login() {
      this.set('error', false);
      this.get('ajax').post('/login-customer', {
        data: {
          user: this.get('email'),
          pass: this.get('password'),
        },
      }).then(() => {
        console.log('ok');
      }, () => {
        this.set('error', 'ERROR');
        console.log('nok');
      });
    },
  },
});
