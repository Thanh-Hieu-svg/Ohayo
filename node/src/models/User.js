const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const hashPassword = require('../middlewares/hashPassword');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  avatar: { type: String }, 
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },

  resetPasswordToken: String,
  resetPasswordExpires: Date,
},{ timestamps: true });


userSchema.pre('save', hashPassword);

module.exports = mongoose.model('User', userSchema);