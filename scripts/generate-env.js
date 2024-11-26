const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// Decrypted YAML file path
const yamlFilePath = path.join(__dirname, '../environments/staging.yaml.dec');

console.log('yamlFilePath', yamlFilePath);

// .env.local file path
const envLocalFilePath = path.join(__dirname, '../.env.local');

console.log('envLocalFilePath', envLocalFilePath);

// Check if the decrypted YAML file exists
if (!fs.existsSync(yamlFilePath)) {
  console.error(`Decrypted YAML file not found at ${yamlFilePath}`);
  process.exit(1);
}

// Parse the YAML content
const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
const parsedData = yaml.parse(yamlContent);

// Convert YAML to .env format
const envContent = Object.entries(parsedData)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

// Write the .env.local file
fs.writeFileSync(envLocalFilePath, envContent, 'utf8');

console.log('.env.local file created successfully.');