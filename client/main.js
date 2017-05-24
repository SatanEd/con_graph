import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {ReactiveVar} from 'meteor/reactive-var';
// import Usr from '../imports/api/user.js';
import '../imports/ui/index.html';
import '../imports/ui/nav.html';
import './main.html';

Template.user.helpers({
  users() {
    let acc;
    if (acc = Meteor.user()) {
      return acc.profile.name;
    } else {
      return "Guest";
    }
  },
});

Template.body.helpers({
  template: function () {
    return Session.get('template');
  },
});

Template.newUser.events({
  'submit #newUser'(e) {
    e.preventDefault();

    var form = $(e.target);
    var data = form.serialize();

    var file = e.target.elements.avatar.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      Meteor.call('registration', {fileName: file.name, clientPath: __dirname}, reader.result, function (err, dt) {
        if (err) {
          console.log('%c' + err, 'color: red');
        } else {
          console.log('%c' + dt, 'color: green');
        }
      });
    };
    reader.readAsBinaryString(file);
  }
});

FlowRouter.route('/', {
  name: 'index',
  action: function () {
    Session.set('template', 'loginForm');
  }
});

FlowRouter.route('/signup', {
  name: 'signup',
  action: function () {
    Session.set('template', 'newUser');
  }
});
