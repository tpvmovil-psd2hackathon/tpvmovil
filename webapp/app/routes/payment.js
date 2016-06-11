import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  queryParams: {
    hash: {
      refreshModel: true,
    },
  },

  model(params) {
    return this.get('ajax').request('/payment', {
      method: 'GET',
      data: {
        hash: params.hash,
      },
    });
  },
});
