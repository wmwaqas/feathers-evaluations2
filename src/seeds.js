const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  name: 'Alan Turing',
  email: 'alan@alan.com',
  password: 'abcd1234'
};

const students = [
  {
    name: 'John',
    photo: 'https://t4.ftcdn.net/jpg/00/91/61/81/240_F_91618179_eR79OdR87jR9fp9S3aaiJGz4aGqkkwuE.jpg',
    red: true,
    yellow: false,
    green: false,
  },
  {
    name: 'Tom',
    photo: 'https://s-media-cache-ak0.pinimg.com/736x/4e/5c/f7/4e5cf7d4ccb9c59b6620a9c71944d51e--emoticons-text-smileys.jpg',
    red: true,
    yellow: false,
    green: false,
  },
  {
    name: 'Micheal',
    photo: 'http://2.bp.blogspot.com/-G1vh_uLbyM8/U5W__nOU6eI/AAAAAAAAIIg/v1y8V_TEduI/s1600/coffee-smiley.png',
    red: false,
    yellow: true,
    green: false,
  },
  {
    name: 'Tim',
    photo: 'http://freedesignfile.com/upload/2016/07/Ok-sign-emoticon-icon.jpg',
    red: false,
    yellow: true,
    green: false,
  },
  {
    name: 'Bob',
    photo: 'http://4.bp.blogspot.com/-Y6Iu7UaLrxE/VZ3QT7gALwI/AAAAAAAAQXs/xKPU4dC_wNA/s1600/good-mood-smiley.jpg',
    red: false,
    yellow: false,
    green: true,
  },
  {
    name: 'Harry',
    photo: 'https://s-media-cache-ak0.pinimg.com/originals/20/a8/ba/20a8baef9cc2949b4021220cfd94ac08.png',
    red: false,
    yellow: false,
    green: true,
  },
];

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(user)
  .then(() => {
    feathersClient.authenticate({
      strategy: 'local',
      email: user.email,
      password: user.password
    })
      .then(() => {
        students.map((student) => {
          feathersClient.service('students').create(student)
            .then((result) => {
              console.log('Recipe seeded...', result.title);
            }).catch((error) => {
              console.error('Error seeding student!', error.message);
            });
        })
      })
      .catch(function(error){
        console.error('Error authenticating!', error);
      });
  })
  .catch(function(error) {
    console.error('Error creating user!');
  });
