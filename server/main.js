import {Meteor} from 'meteor/meteor';
import Users from '../imports/api/user.js';

const fs = require('fs');

const newUser = {
  name: 'George',
  lastname: 'Zizi',
  email: 'wweq@agilepartners.eu',
  birthDate: new Date(),
  avatar: "../img",
  departament: 'Hernea',
  role: 'manager',
  apprAllowed: true,
  language: 'English',
  workDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  absences: [{
    dayStart: new Date(),
    dayEnd: new Date('2017 June 17'),
    description: 'nothing to show',
    allowance: {
      assignee: 'Me',
      comment: '',
      reqDate: new Date(),
      accepted: true
    }
  }]
};

Meteor.startup(() => {
  try {
    Users.schema.validate(newUser)
    Users.insert(newUser)
  } catch (err) {
    if (Meteor.isClient) {
      alert(err)
    } else {
      var colName = Users.rawCollection().namespace.slice().split('.')[1]
      console.log('\x1b[31m', `Can\'t inset new document in "${colName}" collection`, '\x1b[0m')
    }
  }
});

Meteor.methods({
  'file-upload': function (fileInfo, fileData) {
    fs.writeFile(`${fileInfo.clientPath}/assets/images/${fileInfo}`, fileData.fileName, 'binary', (err) => {
      if (err) throw err
      console.log('\x1b[32m', `File with name "${fileInfo}" created.`, '\x1b[0m')
    });
    return `File with name "${fileInfo}" created.`;
  }
});
