/**
 * Created by eduardiliashenco on 5/11/17.
 */
import { Mongo } from 'meteor/mongo';

let Usr = new Mongo.Collection('usr');

Usr.schema = new SimpleSchema({
  name: {type: String},
  lastname: {type: String},
  email: {type: String, regEx: SimpleSchema.RegEx.Email},
  birthDate: {type: Date},
  avatar: {type: String, defaultValue: ''},
  departament: {type: String, optional: true},
  role: {type: String},
  apprAllowed: {type: Boolean, defaultValue: false},
  language: {type: String, optional: true},
  workDays: {type: [String], defaultValue: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']},
  absences: {
    type: [Object],
    optional: true
  },
  "absences.$.dayStart": {type: Date},
  "absences.$.dayEnd": {type: Date},
  "absences.$.description": {type: String, optional: true},
  "absences.$.allowance": {type: Object, defaultValue: {}},
  "absences.$.allowance.assignee": {type: String, optional: true},
  "absences.$.allowance.comment": {type: String, optional: true},
  "absences.$.allowance.reqDate": {type: Date, optional: true},
  "absences.$.allowance.accepted": {type: Boolean, optional: true, defaultValue: false}
});

if (Meteor.isServer) {
  Usr._ensureIndex('email', {unique: 1, sparse: 1});
}

export default Usr;
