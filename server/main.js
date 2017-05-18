import {Meteor} from 'meteor/meteor';
import Users from '../imports/api/user.js';

const fs = require('fs');
const path = require('path');
const projectDir = process.env["PWD"].replace(__dirname, '');

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
  'registration': function (fileInfo, fileData) {
    let ext = path.extname(fileInfo.fileName),
      imageExts = ['.png', '.jpg', '.gif']

    try {
      if (ext && imageExts.some((itm) => itm === ext)) {
        fs.writeFileSync(`${projectDir + fileInfo.clientPath}/assets/images/${fileInfo.fileName}`, fileData, 'binary')
        console.log('\x1b[32m', `File with name "${fileInfo.fileName}" created.`, '\x1b[0m')
        return `File with name "${fileInfo.fileName}" created.`
      } else {
        return `Invalid extension of "${fileInfo.fileName}" file`
      }
    } catch (err) {
      if (err) throw err
    }
  }
});
