import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: 'http://highfredo.me:1337',
  namespace: '/api',
  myToken: null,
  myHash: null,
});
