const bcrypt = require('bcryptjs');

async function hashPassword() {
  if (typeof this.isModified === 'function' && this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

module.exports = hashPassword;