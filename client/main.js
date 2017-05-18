import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import Users from '../imports/api/user.js';

import './main.html';

Template.user.helpers({
  users() {
    return Users.find();
  },
});

Template.newUser.events({
  'submit #newUser'(e) {
    e.preventDefault();

    var form = $(e.target);
    var data = form.serialize();

    var file = e.target.elements.avatar.files[0];
    var reader = new FileReader();
    reader.onload = function() {
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
//
// FlowRouter.route('/blog/:postId', {
//   name: 'blogPost',
//   action: function(params) {
//     console.log("This is my blog post:", params.postId);
//   }
// });
