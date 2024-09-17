const fs = require('fs');
const path = require('path');

const environmentFilePath = path.join(__dirname, 'dist', 'booknest', 'browser', 'main-*.js');
const environmentFile = fs.readdirSync(path.join(__dirname, 'dist', 'booknest', 'browser'))
  .find(file => file.startsWith('main-') && file.endsWith('.js'));

if (environmentFile) {
    let content = fs.readFileSync(path.join(__dirname, 'dist', 'booknest', 'browser', environmentFile), 'utf8');
    const envKeys = ['FIREBASE_API_KEY', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_PROJECT_ID', 'FIREBASE_STORAGE_BUCKET', 'FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_APP_ID', 'FIREBASE_MEASUREMENT_ID', 'STRIPE_PUBLISHABLE_KEY'];

    envKeys.forEach(key => {
        const value = process.env[key];
        if (value) {
            content = content.replace(new RegExp(`YOUR_${key}`, 'g'), value);
        }
    });

    fs.writeFileSync(path.join(__dirname, 'dist', 'booknest', 'browser', environmentFile), content, 'utf8');
    console.log('Environment variables replaced successfully.');
} else {
    console.error('Main bundle file not found.');
}