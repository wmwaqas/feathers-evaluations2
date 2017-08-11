// students-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const students = new Schema({
    name: { type: String, required: true },
    photo: { type: String, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
    red: { type: Boolean, default: false },
    yellow: { type: Boolean, default: false },
    green: { type: Boolean, default: false },
    authorId: { type: Schema.Types.ObjectId, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('students', students);
};
