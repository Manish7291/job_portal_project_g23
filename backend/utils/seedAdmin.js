// Seed script to create an admin user
// Run: node utils/seedAdmin.js

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ email: 'admin@jobflux.com' });
    if (existing) {
      console.log('Admin already exists:', existing.email);
      process.exit(0);
    }

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@jobflux.com',
      password: 'admin123',
      role: 'admin',
      isApproved: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('   Email: admin@jobflux.com');
    console.log('   Password: admin123');
    console.log('   ⚠️  Change the password after first login!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
