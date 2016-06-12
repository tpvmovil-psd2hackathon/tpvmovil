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
          customerName: this.get('email'),
          customerPass: this.get('password'),
        },
      }).then(res => {
        this.get('ajax').set('myToken', res.token);
        this.get('ajax').set('myHash', this.get('displayHash'));
        this.transitionToRoute('accounts');
      }, (e) => {
        this.set('error', e);
      });
    },
  },
});
