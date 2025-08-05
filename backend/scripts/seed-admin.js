import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    console.log('🌱 Starting admin user seeding...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association_najm');
    console.log('✅ Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ 
      $or: [
        { email: 'admin@associationnajm.ma' },
        { username: 'admin' }
      ]
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists:');
      console.log(`   Username: ${existingAdmin.username}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      console.log('   Skipping admin creation...');
      return;
    }

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@associationnajm.ma',
      password: 'Admin123!', // Should be changed after first login
      firstName: 'Admin',
      lastName: 'Najm',
      role: 'admin',
      isActive: true,
      isEmailVerified: true
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully!');
    console.log('📋 Admin credentials:');
    console.log('   Username: admin');
    console.log('   Email: admin@associationnajm.ma');
    console.log('   Password: Admin123!');
    console.log('   Role: admin');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the default password after first login!');
    console.log('🔐 Login endpoint: POST /api/auth/login');
    console.log('📝 Body: { "identifier": "admin", "password": "Admin123!" }');

    // Create a moderator user as well
    const moderatorUser = new User({
      username: 'moderator',
      email: 'moderator@associationnajm.ma',
      password: 'Moderator123!',
      firstName: 'Moderator',
      lastName: 'Najm',
      role: 'moderator',
      isActive: true,
      isEmailVerified: true
    });

    await moderatorUser.save();

    console.log('');
    console.log('✅ Moderator user created successfully!');
    console.log('📋 Moderator credentials:');
    console.log('   Username: moderator');
    console.log('   Email: moderator@associationnajm.ma');
    console.log('   Password: Moderator123!');
    console.log('   Role: moderator');

    // Create a regular user for testing
    const testUser = new User({
      username: 'testuser',
      email: 'test@associationnajm.ma',
      password: 'Test123!',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      isActive: true,
      isEmailVerified: true
    });

    await testUser.save();

    console.log('');
    console.log('✅ Test user created successfully!');
    console.log('📋 Test user credentials:');
    console.log('   Username: testuser');
    console.log('   Email: test@associationnajm.ma');
    console.log('   Password: Test123!');
    console.log('   Role: user');

    console.log('');
    console.log('🎉 All users seeded successfully!');
    console.log('📊 Summary:');
    console.log('   - 1 Admin user');
    console.log('   - 1 Moderator user');
    console.log('   - 1 Test user');

  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    
    if (error.code === 11000) {
      console.log('💡 Tip: Admin user might already exist. Check your database.');
    }
    
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding
seedAdmin();
