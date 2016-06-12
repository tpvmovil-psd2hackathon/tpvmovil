import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model() {
    return this.get('ajax').request('https://apisandbox.openbankproject.com/obp/v2.0.0/my/accounts', {
      headers: {
        Authorization: `DirectLogin token="${this.get('ajax.myToken')}"`,
      },
    });
  },
});
