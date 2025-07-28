const mongoose = require('mongoose');
const User = require('../models/User'); 

async function createAdmin() {
  await mongoose.connect('mongodb://localhost:27017/Ohayo');

  const admin = new User({
    username: 'admin',
    email: 'admin@gmail.com',
    password: '12345678', 
    role: 'admin'
  });

  try {
    await admin.save();
    console.log('Admin account created!');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();