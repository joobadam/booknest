/* const fs = require('fs');
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
            content = content.replace(new RegExp(`'${key}'`, 'g'), `'${value}'`);
        }
    });

    fs.writeFileSync(path.join(__dirname, 'dist', 'booknest', 'browser', environmentFile), content, 'utf8');
    console.log('Environment variables replaced successfully.');
} else {
    console.error('Main bundle file not found.');
} */



const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist', 'booknest', 'browser');
const environmentFile = fs.readdirSync(distDir)
  .find(file => file.startsWith('main-') && file.endsWith('.js'));

if (!environmentFile) {
    console.error('Main bundle file not found.');
    process.exit(1);  
}


const filePath = path.join(distDir, environmentFile);
let content;

try {
    content = fs.readFileSync(filePath, 'utf8');
} catch (err) {
    console.error('Failed to read the bundle file:', err);
    process.exit(1);  
}

const envKeys = [
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_STORAGE_BUCKET',
    'FIREBASE_MESSAGING_SENDER_ID',
    'FIREBASE_APP_ID',
    'FIREBASE_MEASUREMENT_ID',
    'STRIPE_PUBLISHABLE_KEY'
];

envKeys.forEach(key => {
    const value = process.env[key];
    if (value) {
        const regex = new RegExp(`('${key}':\\s*')([^']*)(')`, 'g');
        content = content.replace(regex, `$1${value}$3`);
        console.log(`Replaced ${key}`);
    } else {
        console.warn(`Environment variable ${key} is not set.`);
    }
});

try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Environment variables replaced successfully.');
} catch (err) {
    console.error('Failed to write the bundle file:', err);
    process.exit(1); 
}