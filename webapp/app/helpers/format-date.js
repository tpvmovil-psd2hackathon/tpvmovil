import Ember from 'ember';

export function formatDate(params/*, hash*/) {
  const d = new Date(params[0]);
  return `${d.getUTCMonth()}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
}

export default Ember.Helper.helper(formatDate);
