const express = require('express');
const  kmlParse = require('kml-parse');
const fs = require('fs-extra');
const DOMParser = require('xmldom').DOMParser;

const app = express();

app.get('/', (req, res) => {
	res.json(getJson());
})

app.listen(3000, () => {
	console.log('Server running at port 3000');
})

function getJson() {
  const kmlDom = new DOMParser().parseFromString(
    fs.readFileSync("assets/cosule.kml", "utf-8")
  );

  const result = kmlParse.parseGeoJSON(kmlDom).features;

  const foo = result.filter(x => x.geometry.coordinates != undefined);

  foo.map(x => {
	x.geometry.coordinates = x.geometry.coordinates[0];
  }); 

  foo.map(x => {
	x.geometry.coordinates = x.geometry.coordinates.map(z => {
		return [z[1], z[0], z[2]];
	})
  })

  return foo; 
}

writeJson();

function writeJson() {
  const kmlDom = new DOMParser().parseFromString(
    fs.readFileSync("assets/cosule.kml", "utf-8")
  );

  const result = kmlParse.parseGeoJSON(kmlDom).features;

  const json = JSON.stringify(result);

  fs.writeFile('result.json', json, 'utf-8')
}
