const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
//const passportLocalMongoose = require('passport-local-mongoose');

const SALT_WORK_FACTOR = 10;
const UserSchema = mongoose.Schema(
  {
    profil: {
      name: {
        type: String, lowercase: true, trim: true, default: '',
      },
      address: {
        type: String, lowercase: true, trim: true, default: '',
      },
      town: {
        type: String, lowercase: true, trim: true, default: '',
      },
      country: {
        type: String, lowercase: true, trim: true, default: '',
      },
      phone: {
        type: String, trime: true, default: '',
      },
      picture: {
        type: String, default: '',
      },
    },
    email: {
      type: String, required: 'email is required', index: { unique: true }, lowercase: true, trim: true,
    },
    password: {
      type: String, required: true, trim: true,
    },
    phone: {
      type: String, trime: true, default: '',
    },
    history: [{
      date: Date,
      paid: { type: Number, default: 0 },
    }],
  },
  { timestamps: true },
);

//UserSchema.plugin(passportLocalMongoose);

UserSchema.pre('save', function preSave(next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, (hasherr, hash) => {
      if (hasherr) return next(hasherr);
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});
UserSchema.post('save', (user) => {
  console.log(`user ${user._id} est bien enregistré`);
});

UserSchema.methods.comparePassword = (candidatePassword) => {
  return bcrypt.compareSync(candidatePassword, this.password);
};

UserSchema.methods.gravatar = (size) => {
  if (!this.size)  size = 200;
  if (!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  let md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};


module.exports = mongoose.model('User', UserSchema);
