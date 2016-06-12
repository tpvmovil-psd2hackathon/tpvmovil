import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  details: Ember.computed('details_', function () {
    return this.get('details_');
  }),

  actions: {
    details(url) {
      this.get('ajax').request(url, {
        headers: {
          Authorization: `DirectLogin token="${this.get('ajax.myToken')}"`,
        },
      }).then(res => {
        this.set('details_', res);
        console.log(res);
      }, (e) => {

      });
    },

    pay(id, bankId) {
      console.log(id, bankId);
      this.get('ajax').post('/requestPayment', {
        headers: {
          Authorization: `DirectLogin token="${this.get('ajax.myToken')}"`,
        },
        data: JSON.stringify({
          customer: {
            bank_id: bankId,
            account_id: id,
          },
          hash: this.get('ajax.myToken'),
        }),
      }).then(res => {
        console.log(res);
      }, (e) => {

      });
    },
  },
});
