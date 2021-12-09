// const express = require('express');
const kmlParse = require('kml-parse');
const fs = require('fs-extra');
const DOMParser = require('xmldom').DOMParser;

// const app = express();

// app.get('/', (req, res) => {
// 	res.json(getJson());
// })

// app.listen(3000, () => {
// 	console.log('Server running at port 3000');
// })

// function getJson() {
//   const kmlDom = new DOMParser().parseFromString(
//     fs.readFileSync("assets/cosule.kml", "utf-8")
//   );

//   let result = kmlParse.parseGeoJSON(kmlDom);

//   const foo = result.features.filter(x => x.geometry.coordinates != undefined);

//   foo.map(x => {
//     if (x.geometry.type == 'Polygon') {
//       x.geometry.coordinates[0] = x.geometry.coordinates[0].map(cords => {
//         return [cords[1], cords[0], cords[2]];
//       });
//     }
//   })

//   result.features = foo;
  
//   return result; 
// }

writeJson();

function writeJson() {
  const kmlDom = new DOMParser().parseFromString(
    fs.readFileSync("assets/cosule.kml", "utf-8")
  );

  let result = kmlParse.parseGeoJSON(kmlDom);

  const foo = result.features.filter(x => x.geometry.coordinates != undefined);

  // foo.map(x => {
  //   if (x.geometry.type == 'Polygon') {
  //     x.geometry.coordinates[0] = x.geometry.coordinates[0].map(cords => {
  //       return [cords[1], cords[0], cords[2]];
  //     });
  //   }
  // })

  result.features = foo;

  const json = JSON.stringify(result);

  fs.writeFile('result.json', json, 'utf-8')
}
