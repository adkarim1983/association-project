import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate a secure random secret
const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Generate JWT secrets
const accessSecret = generateSecret();
const refreshSecret = generateSecret();

console.log('🔐 Generated JWT Secrets:');
console.log('========================');
console.log(`JWT_ACCESS_SECRET=${accessSecret}`);
console.log(`JWT_REFRESH_SECRET=${refreshSecret}`);
console.log('========================');

// Read current .env file if it exists
const envPath = path.join(__dirname, '../.env');
let envContent = '';

try {
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    console.log('📄 Found existing .env file');
  } else {
    console.log('📄 No .env file found, creating new one');
  }
} catch (error) {
  console.log('📄 Creating new .env file');
}

// Update or add JWT secrets
const updateEnvVariable = (content, key, value) => {
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(content)) {
    return content.replace(regex, `${key}=${value}`);
  } else {
    return content + `\n${key}=${value}`;
  }
};

// Update JWT secrets in env content
envContent = updateEnvVariable(envContent, 'JWT_ACCESS_SECRET', accessSecret);
envContent = updateEnvVariable(envContent, 'JWT_REFRESH_SECRET', refreshSecret);

// Add default JWT expiration times if not present
if (!envContent.includes('JWT_ACCESS_EXPIRE=')) {
  envContent = updateEnvVariable(envContent, 'JWT_ACCESS_EXPIRE', '15m');
}
if (!envContent.includes('JWT_REFRESH_EXPIRE=')) {
  envContent = updateEnvVariable(envContent, 'JWT_REFRESH_EXPIRE', '7d');
}

// Write updated .env file
try {
  fs.writeFileSync(envPath, envContent.trim() + '\n');
  console.log('✅ Successfully updated .env file with JWT secrets');
  console.log('🔒 Your JWT secrets have been securely generated and saved');
  console.log('⚠️  Keep these secrets secure and never commit them to version control!');
} catch (error) {
  console.error('❌ Error writing .env file:', error.message);
  console.log('📋 Please manually add these secrets to your .env file:');
  console.log(`JWT_ACCESS_SECRET=${accessSecret}`);
  console.log(`JWT_REFRESH_SECRET=${refreshSecret}`);
  console.log('JWT_ACCESS_EXPIRE=15m');
  console.log('JWT_REFRESH_EXPIRE=7d');
}
