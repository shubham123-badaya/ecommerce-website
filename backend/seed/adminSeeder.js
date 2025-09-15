import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js'; // ES module me .js extension required

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@dryfruit.com' });
    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@dryfruit.com',
      password: 'admin123', // pre-save hook will hash
    });

    await admin.save();
    console.log('Admin seeded successfully');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

seedAdmin();
