// import faker from "faker";
// import {createArrayOf} from "../arrays";
// import {randomBetween, randomOf} from "../helpers/randoms";
// import fs from "fs";
//
// const argv = require('yargs')
//   .option('output', { alias: 'o', type: 'string' })
//   .option('format', { alias: 'f', choices: ['table', 'json', 'csv'] })
//   .option('log',    { type: 'boolean', default: false })
//   .argv
//
// function generateSimilarId(){
//   return faker.random.alphaNumeric(2).toUpperCase()
//     + randomBetween(100000, 999999) + '-' + faker.random.alphaNumeric(2).toUpperCase()
// }
//
// function generateTrucks(count = 25){
//   return createArrayOf(count, null).map(() => ({
//     id:   generateSimilarId(),
//     vin:  faker.random.uuid(),
//     plates: (faker.random.alphaNumeric(3)+" "+faker.random.alphaNumeric(3)).toUpperCase(),
//     geo:{ lat: faker.address.latitude(), lng: faker.address.longitude() },
//     status: randomOf(['ACT', 'STP', 'N/A']),
//     type:   randomOf(['car', 'van', 'pickup', 'truck (sm)', 'truck (md)', 'truck (lg)', 'other']),
//     location: {
//       city:   faker.address.city(),
//       street: faker.address.streetName()
//     }
//   }));
// }
//
//
// const generated = generateTrucks();
//
// if(argv.log) {
//   switch (argv.format) {
//     default:
//     case undefined: console.log(generated); break;
//     case 'table': console.table(generated); break;
//   }
// }
// if(argv.output){
//   switch (argv.format) {
//     default:
//     case undefined:
//     case 'json': fs.writeFileSync(argv.output, JSON.stringify(generated, null, 4)); break;
//   }
// }
