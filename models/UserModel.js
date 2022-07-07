const { Schema, model } = require('mongoose')

const userModel = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  }
}, { timestamps: true });


const User = model('User', userModel);

module.exports = User;