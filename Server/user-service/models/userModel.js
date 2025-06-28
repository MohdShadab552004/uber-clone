import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: [true, "Enter a valid email"] },
  password: String,
  firstName: String,
  lastName: String,
  userType: { type: String, enum: ['rider', 'driver', 'admin'], required: true , default:'rider'},
  totalRides: { type: Number, default: 0 },
  walletBalance: { type: Number, default: 0 },
  paymentMethods: [{
    cardType: String,
    last4: String,
    token: String,
    isDefault: Boolean
  }],
  currentLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true })

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword =  function (enteredPassword) {
  return  bcrypt.compare(enteredPassword, this.password); 
}

userSchema.methods.generateResetToken =  function() {
  return  jwt.sign({email: this.email }, process.env.JWT_SECRET, {
    expiresIn: '15m'
  });
};


const user = mongoose.model('User', userSchema);

export default user;