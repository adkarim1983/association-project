import { initializeI18n, getTranslation } from '../config/i18n.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testTranslations = async () => {
  console.log('🌍 Testing Backend Translation System...\n');

  try {
    // Initialize i18n
    await initializeI18n();
    console.log('✅ i18next initialized successfully\n');

    // Test languages
    const languages = ['fr', 'en', 'ar'];
    
    // Test keys to check
    const testKeys = [
      'header.home',
      'header.projects',
      'projects.categories.restauration',
      'projects.locations.sidi_othmane_admin',
      'projects.list.planet_food.name',
      'projects.list.planet_food.description',
      'projects.list.alphacom.name',
      'projects.list.mohcin_najmi_production.name'
    ];

    console.log('📊 Translation Test Results:');
    console.log('=' .repeat(80));

    // Test each language
    for (const lang of languages) {
      console.log(`\n🌐 Language: ${lang.toUpperCase()}`);
      console.log('-'.repeat(40));
      
      let successCount = 0;
      let totalCount = testKeys.length;
      
      for (const key of testKeys) {
        const translation = getTranslation(key, lang);
        const isTranslated = translation && !translation.startsWith(key);
        
        if (isTranslated) {
          console.log(`✅ ${key}: "${translation}"`);
          successCount++;
        } else {
          console.log(`❌ ${key}: MISSING (fallback: "${translation}")`);
        }
      }
      
      const percentage = Math.round((successCount / totalCount) * 100);
      console.log(`\n📈 Coverage: ${successCount}/${totalCount} (${percentage}%)`);
    }

    // Check translation files existence and content
    console.log('\n📁 Translation Files Analysis:');
    console.log('=' .repeat(80));
    
    for (const lang of languages) {
      const filePath = path.join(__dirname, `../locales/${lang}/translation.json`);
      
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const translations = JSON.parse(fileContent);
        
        // Count keys
        const countKeys = (obj, prefix = '') => {
          let count = 0;
          for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              count += countKeys(obj[key], prefix + key + '.');
            } else {
              count++;
            }
          }
          return count;
        };
        
        const keyCount = countKeys(translations);
        const hasProjects = translations.projects && translations.projects.list;
        const projectCount = hasProjects ? Object.keys(translations.projects.list).length : 0;
        
        console.log(`\n🌐 ${lang.toUpperCase()} (${filePath})`);
        console.log(`   📊 Total keys: ${keyCount}`);
        console.log(`   📋 Project translations: ${projectCount}`);
        console.log(`   ✅ File exists: Yes`);
        console.log(`   📝 Has projects section: ${hasProjects ? 'Yes' : 'No'}`);
        
      } catch (error) {
        console.log(`\n🌐 ${lang.toUpperCase()}`);
        console.log(`   ❌ File error: ${error.message}`);
      }
    }

    // Summary and recommendations
    console.log('\n🎯 Summary & Recommendations:');
    console.log('=' .repeat(80));
    
    // Check if French has project translations
    const frTranslation = getTranslation('projects.list.planet_food.name', 'fr');
    const enTranslation = getTranslation('projects.list.planet_food.name', 'en');
    const arTranslation = getTranslation('projects.list.planet_food.name', 'ar');
    
    console.log('\n📋 Project Translation Status:');
    console.log(`   🇫🇷 French: ${frTranslation && !frTranslation.startsWith('projects.') ? '✅ Working' : '❌ Missing'}`);
    console.log(`   🇬🇧 English: ${enTranslation && !enTranslation.startsWith('projects.') ? '✅ Working' : '❌ Missing'}`);
    console.log(`   🇸🇦 Arabic: ${arTranslation && !arTranslation.startsWith('projects.') ? '✅ Working' : '❌ Missing'}`);
    
    console.log('\n💡 Recommendations:');
    if (!frTranslation || frTranslation.startsWith('projects.')) {
      console.log('   ⚠️  Add project translations to French (fr/translation.json)');
    }
    if (!arTranslation || arTranslation.startsWith('projects.')) {
      console.log('   ⚠️  Add project translations to Arabic (ar/translation.json)');
    }
    if (enTranslation && !enTranslation.startsWith('projects.')) {
      console.log('   ✅ English translations are complete');
    }

  } catch (error) {
    console.error('❌ Translation test failed:', error);
  }
};

// Run the test
testTranslations();
