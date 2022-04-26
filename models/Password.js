const mongoose = require('mongoose');
const { Schema } = mongoose;

const PasswordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  email: {
    type: String,
    required: true,
  },
  old_password: {
    type: Schema.Types.String,
    ref: 'users',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Password', PasswordSchema);
