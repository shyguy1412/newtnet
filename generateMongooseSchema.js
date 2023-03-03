const fs = require('fs');
const path = require('path');
const { parse } = require('yaml');

const schemaPath = path.join(__dirname, 'src/lib/mongoose');

//read config file
const configFile = fs.readFileSync(path.join(__dirname, 'specification', 'mongo.yaml')).toString();
const { database, collections } = parse(configFile);

//remove old schema
if (fs.existsSync(schemaPath))
    fs.rmSync(path.join(schemaPath, '*'), { force: true });

//create path if it does not exist
else
    fs.mkdirSync(schemaPath, { recursive: true });

const schemas = Object.entries(collections);

for (schema of schemas) {
    const schemaFile = createSchemaFile(schema[0], schema[1]);
    fs.writeFile(path.join(schemaPath, schema[0] + '.ts'), schemaFile, _ => { });
}


////// BEGIN GENERATE SCHEMA FILE ///////////

function createSchemaFile(name, schema) {
    //Map properties to a more usefull format
    const properties = Object.entries(schema)
        .map(([key, value]) => ({
            name: key,
            ...value
        }))

    /// BEGIN TEMPLATE///
    return (
/*ts*/`import { Model, model, models, Schema } from "mongoose"

export interface I${name}{
${indent(generateInterfaceProperties(properties), 2)}
}

const ${name}Schema = new Schema<I${name}>({
${indent(generateSchemaProperties(properties), 2)}
})

let ${name}Model: Model<I${name}>;

try {
    ${name}Model = model<I${name}>("${name}", ${name}Schema);
    console.log('Registerd ${name} Model');
} catch (_) {
    ${name}Model = models['${name}'];
    console.warn('Did not recompile ${name} Model');
}

export const ${name} = ${name}Model;
`
    )
/// END TEMPLATE///
}

///////// END GENERATE SCHEMA FILE ////////////


function generateInterfaceProperties(properties) {
    return properties
        .map(property => `${property.name}: ${property.ref ? 'I' : ''}${property.type}`)
        .join('\n');
}

function generateSchemaProperties(properties) {
    return properties
        .map(property => `
${property.name}: {
    type: ${property.ref ? 'Schema.Types.ObjectId' : property.type},
    ${property.unique ? 'unique: true' : ''},
    ${property.required ? 'required: true' : ''},
    ${property.default != undefined ? `default: ${property.default}` : ''},
},   `)
        .map(chunk => chunk.replaceAll(/^\s*,?\s*\n/gm, ''))
        .join('\n');
}

function indent(string, amt) {
    return string
        .split(/\r\n|\r|\n/)
        .map(string => ' '.repeat(amt) + string)
        .join('\n')
}