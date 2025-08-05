import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contact from '../models/Contact.js';
import { testEmailConfig } from '../config/email.js';

// Load environment variables
dotenv.config();

const testContactSystem = async () => {
  console.log('📧 Testing Contact Management System...\n');

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association_najm');
    console.log('✅ Connected to MongoDB');

    // Test email configuration
    console.log('\n📬 Testing Email Configuration...');
    const emailTest = await testEmailConfig();
    if (emailTest.success) {
      console.log('✅ Email configuration is valid');
    } else {
      console.log(`⚠️  Email configuration: ${emailTest.message || emailTest.error}`);
    }

    // Test contact model
    console.log('\n📝 Testing Contact Model...');
    
    // Create test contact
    const testContact = new Contact({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Contact Message',
      message: 'This is a test message to verify the contact system is working properly.',
      category: 'general',
      language: 'fr',
      ipAddress: '127.0.0.1',
      userAgent: 'Test Agent'
    });

    await testContact.save();
    console.log('✅ Test contact created successfully');

    // Test contact methods
    await testContact.markAsRead();
    console.log('✅ Contact marked as read');

    await testContact.markAsReplied();
    console.log('✅ Contact marked as replied');

    // Test static methods
    const stats = await Contact.getStats();
    console.log('✅ Contact statistics retrieved:', stats);

    const newContacts = await Contact.findNew();
    console.log(`✅ Found ${newContacts.length} new contacts`);

    // Test contact categories
    const categories = await Contact.distinct('category');
    console.log('✅ Available categories:', categories);

    // Clean up test data
    await Contact.findByIdAndDelete(testContact._id);
    console.log('✅ Test contact cleaned up');

    console.log('\n🎯 Contact System Test Results:');
    console.log('================================');
    console.log('✅ Database connection: Working');
    console.log('✅ Contact model: Working');
    console.log('✅ Contact methods: Working');
    console.log('✅ Static methods: Working');
    console.log(`${emailTest.success ? '✅' : '⚠️'} Email system: ${emailTest.success ? 'Working' : 'Not configured'}`);

    console.log('\n📊 Current Contact Statistics:');
    const currentStats = await Contact.getStats();
    console.log(`   Total contacts: ${currentStats.total}`);
    console.log(`   New: ${currentStats.new}`);
    console.log(`   Read: ${currentStats.read}`);
    console.log(`   Replied: ${currentStats.replied}`);
    console.log(`   Archived: ${currentStats.archived}`);
    console.log(`   Urgent: ${currentStats.urgent}`);
    console.log(`   High priority: ${currentStats.high}`);

    console.log('\n🚀 API Endpoints Available:');
    console.log('============================');
    console.log('POST   /api/contact              - Submit contact form');
    console.log('GET    /api/contact              - Get all contacts (admin/moderator)');
    console.log('GET    /api/contact/stats        - Get contact statistics (admin/moderator)');
    console.log('GET    /api/contact/:id          - Get specific contact (admin/moderator)');
    console.log('PUT    /api/contact/:id          - Update contact (admin/moderator)');
    console.log('DELETE /api/contact/:id          - Delete contact (admin only)');
    console.log('POST   /api/contact/:id/reply    - Mark as replied (admin/moderator)');
    console.log('POST   /api/contact/:id/spam     - Mark as spam (admin/moderator)');

    console.log('\n💡 Next Steps:');
    console.log('==============');
    if (!emailTest.success) {
      console.log('1. Configure email settings in .env file for notifications');
      console.log('   - Set EMAIL_HOST, EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL');
    }
    console.log('2. Test the API endpoints with Postman or frontend');
    console.log('3. Create admin interface for contact management');
    console.log('4. Set up email templates customization');

  } catch (error) {
    console.error('❌ Contact system test failed:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the test
testContactSystem();
