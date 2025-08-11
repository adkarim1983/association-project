import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const verifyContactsInDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association');
    console.log('✅ Connected to MongoDB');

    // Get all contacts from database
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(10);
    
    console.log('\n📧 CONTACTS DANS LA BASE DE DONNÉES:');
    console.log('='.repeat(50));
    
    if (contacts.length === 0) {
      console.log('❌ Aucun contact trouvé dans la base de données');
    } else {
      console.log(`✅ ${contacts.length} contact(s) trouvé(s):\n`);
      
      contacts.forEach((contact, index) => {
        console.log(`${index + 1}. ID: ${contact._id}`);
        console.log(`   Nom: ${contact.name}`);
        console.log(`   Email: ${contact.email}`);
        console.log(`   Sujet: ${contact.subject}`);
        console.log(`   Statut: ${contact.status}`);
        console.log(`   Catégorie: ${contact.category}`);
        console.log(`   Date: ${contact.createdAt.toLocaleString('fr-FR')}`);
        console.log(`   IP: ${contact.ipAddress || 'N/A'}`);
        console.log(`   Spam: ${contact.isSpam ? 'Oui' : 'Non'}`);
        console.log('-'.repeat(40));
      });
    }

    // Get statistics
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
          read: { $sum: { $cond: [{ $eq: ['$status', 'read'] }, 1, 0] } },
          replied: { $sum: { $cond: [{ $eq: ['$status', 'replied'] }, 1, 0] } },
          archived: { $sum: { $cond: [{ $eq: ['$status', 'archived'] }, 1, 0] } },
          spam: { $sum: { $cond: ['$isSpam', 1, 0] } }
        }
      }
    ]);

    if (stats.length > 0) {
      const stat = stats[0];
      console.log('\n📊 STATISTIQUES:');
      console.log('='.repeat(30));
      console.log(`Total: ${stat.total}`);
      console.log(`Nouveaux: ${stat.new}`);
      console.log(`Lus: ${stat.read}`);
      console.log(`Répondus: ${stat.replied}`);
      console.log(`Archivés: ${stat.archived}`);
      console.log(`Spam: ${stat.spam}`);
    }

    console.log('\n✅ Vérification terminée avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Connexion MongoDB fermée');
  }
};

// Run verification
verifyContactsInDB();
