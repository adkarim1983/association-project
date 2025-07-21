import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

// Load environment variables
dotenv.config();

// Project data from the frontend
const projectsData = [
  {
    id: 1,
    name: "projects.list.planet_food.name",
    category: "projects.categories.restauration",
    location: "projects.locations.sidi_othmane_admin",
    lat: 33.6005,
    lng: -7.5306,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image12.jpg",
    phone: "+212 6 12 34 56 78",
    email: "contact@planetfood.ma",
    address: "projects.list.planet_food.address",
    hours: "12:00 - 23:00",
    website: "https://planetfood.ma",
    description: "projects.list.planet_food.description"
  },
  {
    id: 2,
    name: "projects.list.alphacom.name",
    category: "projects.categories.marketing_digital",
    location: "projects.locations.sidi_othmane_industrial",
    lat: 33.605,
    lng: -7.525,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image9-398x530.jpg",
    phone: "+212 6 98 76 54 32",
    email: "info@alphacom.agency",
    address: "projects.list.alphacom.address",
    hours: "09:00 - 18:00",
    website: "https://alphacom.agency",
    description: "projects.list.alphacom.description"
  },
  {
    id: 3,
    name: "projects.list.baha_happye_park.name",
    category: "projects.categories.evenementiel",
    location: "projects.locations.moulay_rachid_admin",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image56-375x530.png",
    phone: "+212 6 11 22 33 44",
    email: "contact@bahapark.com",
    address: "projects.list.baha_happye_park.address",
    hours: "10:00 - 20:00",
    website: "https://bahapark.com",
    description: "projects.list.baha_happye_park.description"
  },
  {
    id: 4,
    name: "projects.list.pixel_prod.name",
    category: "projects.categories.design",
    location: "projects.locations.sidi_othmane_industrial",
    lat: 33.608,
    lng: -7.528,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image11-398x530.jpg",
    phone: "+212 6 55 44 33 22",
    email: "hello@pixelprod.ma",
    address: "projects.list.pixel_prod.address",
    hours: "09:00 - 17:00",
    website: "https://pixelprod.ma",
    description: "projects.list.pixel_prod.description"
  },
  {
    id: 5,
    name: "projects.list.az_event_733.name",
    category: "projects.categories.evenementiel",
    location: "projects.locations.sidi_othmane_industrial",
    lat: 33.612,
    lng: -7.532,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image10-398x530.jpg",
    phone: "+212 6 77 88 99 00",
    email: "contact@azevent733.com",
    address: "projects.list.az_event_733.address",
    hours: "10:00 - 19:00",
    website: "https://azevent733.com",
    description: "projects.list.az_event_733.description"
  },
  {
    id: 6,
    name: "projects.list.erregyby_event.name",
    category: "projects.categories.evenementiel",
    location: "projects.locations.moulay_rachid_admin",
    lat: 33.615,
    lng: -7.545,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image8-398x530.jpg",
    phone: "+212 6 33 22 11 00",
    email: "info@erregybyevent.ma",
    address: "projects.list.erregyby_event.address",
    hours: "09:00 - 18:00",
    website: "https://erregybyevent.ma",
    description: "projects.list.erregyby_event.description"
  },
  {
    id: 7,
    name: "projects.list.snack_yacout.name",
    category: "projects.categories.restauration",
    location: "projects.locations.sidi_othmane_industrial",
    lat: 33.602,
    lng: -7.520,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image7-398x530.jpg",
    phone: "+212 6 44 55 66 77",
    email: "contact@snackyacout.ma",
    address: "projects.list.snack_yacout.address",
    hours: "07:00 - 20:00",
    website: "https://snackyacout.ma",
    description: "projects.list.snack_yacout.description"
  },
  {
    id: 8,
    name: "projects.list.foratino.name",
    category: "projects.categories.restauration",
    location: "projects.locations.moulay_rachid_admin",
    lat: 33.618,
    lng: -7.548,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image6-398x530.jpg",
    phone: "+212 6 88 99 00 11",
    email: "antonio@foratino.ma",
    address: "projects.list.foratino.address",
    hours: "11:00 - 23:00",
    website: "https://foratino.ma",
    description: "projects.list.foratino.description"
  },
  {
    id: 9,
    name: "projects.list.om_ali_food.name",
    category: "projects.categories.restauration",
    location: "projects.locations.el_harouiyine_admin",
    lat: 33.620,
    lng: -7.550,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image5-398x530.jpg",
    phone: "+212 6 22 33 44 55",
    email: "contact@omalifood.ma",
    address: "projects.list.om_ali_food.address",
    hours: "08:00 - 22:00",
    website: "https://omalifood.ma",
    description: "projects.list.om_ali_food.description"
  },
  {
    id: 10,
    name: "projects.list.wafae_el_hana.name",
    category: "projects.categories.patisserie",
    location: "projects.locations.el_rajae_admin",
    lat: 33.625,
    lng: -7.555,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image4-398x530.jpg",
    phone: "+212 6 66 77 88 99",
    email: "wafae@elhana.ma",
    address: "projects.list.wafae_el_hana.address",
    hours: "06:00 - 21:00",
    website: "https://wafaeelhana.ma",
    description: "projects.list.wafae_el_hana.description"
  },
  {
    id: 11,
    name: "projects.list.doja_event.name",
    category: "projects.categories.evenementiel",
    location: "projects.locations.sidi_othmane_admin",
    lat: 33.607,
    lng: -7.535,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image3-398x530.jpg",
    phone: "+212 6 11 00 99 88",
    email: "info@dojaevent.ma",
    address: "projects.list.doja_event.address",
    hours: "10:00 - 18:00",
    website: "https://dojaevent.ma",
    description: "projects.list.doja_event.description"
  },
  {
    id: 12,
    name: "projects.list.mohcin_najmi_production.name",
    category: "projects.categories.production_digitale",
    location: "projects.locations.sidi_othmane_admin",
    lat: 33.609,
    lng: -7.538,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image2-398x530.jpg",
    phone: "+212 6 55 66 77 88",
    email: "mohcin@najmiproduction.ma",
    address: "projects.list.mohcin_najmi_production.address",
    hours: "09:00 - 17:00",
    website: "https://najmiproduction.ma",
    description: "projects.list.mohcin_najmi_production.description"
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association_najm');
    console.log('✅ Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Transform and insert projects
    const projects = projectsData.map(project => ({
      name: project.name,
      category: project.category,
      location: project.location,
      coordinates: {
        lat: project.lat,
        lng: project.lng
      },
      contact: {
        phone: project.phone,
        email: project.email,
        website: project.website
      },
      address: project.address,
      hours: project.hours,
      description: project.description,
      image: project.image,
      status: 'active',
      featured: project.id <= 3, // Make first 3 projects featured
      tags: [project.category.split('.').pop()], // Extract category name as tag
      metadata: {
        views: Math.floor(Math.random() * 100), // Random views for demo
        likes: Math.floor(Math.random() * 50)   // Random likes for demo
      }
    }));

    const insertedProjects = await Project.insertMany(projects);
    console.log(`✅ Successfully seeded ${insertedProjects.length} projects`);

    // Display summary
    const categoryCounts = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log('\n📊 Seeding Summary:');
    console.log(`Total projects: ${insertedProjects.length}`);
    console.log('Projects by category:');
    categoryCounts.forEach(cat => {
      console.log(`  - ${cat._id}: ${cat.count}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding
seedDatabase();
