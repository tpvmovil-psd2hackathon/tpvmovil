import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['hash'],
  hash: null,

  hashC: Ember.computed('hash', function () {
    return this.get('hash');
  }),
});
