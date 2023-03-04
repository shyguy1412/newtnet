const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src/config.ts');

//read env file
const envFile = fs.readFileSync(path.join(__dirname, '.env.local')).toString();

//remove old config
if (fs.existsSync(configPath))
    fs.rmSync(configPath, { force: true });

const configFile = `\
import { config as loadEnviroment } from 'dotenv';

loadEnviroment({ path: '../.env.local' });

` + envFile.split('\n')
    .map(line => `export const ${line.split('=')[0].toLowerCase()} =  process.env.${line.split('=')[0]}!;`)
    .join('\n');

fs.writeFileSync(configPath, configFile);