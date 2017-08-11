const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');
const { populate } = require('feathers-hooks-common');


const authorSchema = {
  include: {
     service: 'users',
     nameAs: 'author',
     parentField: 'authorId',
     childField: '_id',
   }
 };



 const restrict = [
   authenticate('jwt'),
   restrictToAuthenticated(),
 ];

 const restrictToOwners = [
   ...restrict,
   restrictToOwner({
     ownerField: 'authorId'
   })
 ]

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
       ...restrict,
       associateCurrentUser({ as: 'authorId' }),
     ],
     update: [],
     patch: [],
     remove: [...restrictToOwners]
  },

  after: {
    all: [
      populate({ schema: authorSchema }),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
