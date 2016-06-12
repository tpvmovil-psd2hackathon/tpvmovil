import Ember from 'ember';

export function formatTime(params/*, hash*/) {
  const d = new Date(params[0]);
  return `${d.getUTCHours()}:${d.getUTCMinutes()}`;
}

export default Ember.Helper.helper(formatTime);
