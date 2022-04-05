const { XMLParser } = require("fast-xml-parser");
const fs = require("fs");

const options = {
  ignoreAttributes: false,
};

const xmlDataBuffer = fs.readFileSync("20220405.xml"); //http://www7.slv.se/apilivsmedel/LivsmedelService.svc/Livsmedel/Naringsvarde/<ÅÅÅÅMMDD>

const xmlDataStr = xmlDataBuffer.toString();

const parser = new XMLParser(options);
const jsonObj = parser.parse(xmlDataStr);
const fruktNyckel = "Frukt färsk fryst";
const barNyckel = "Bär färska frysta";
const sockerNyckel = "Socker totalt";
const livsmedelslista = jsonObj.LivsmedelDataset.LivsmedelsLista.Livsmedel;
const frukterOchBar = livsmedelslista.filter(
  (item) => item.Huvudgrupp === fruktNyckel || item.Huvudgrupp === barNyckel
);

for (const [index, fruktBar] of frukterOchBar.entries()) {
  const namn = fruktBar.Namn;
  const viktGram = fruktBar.ViktGram;
  const sockerMangd = fruktBar.Naringsvarden.Naringsvarde.find(
    (naringsvarde) => naringsvarde.Namn === sockerNyckel
  );
  console.log(`${index + 1}: ${namn} ${sockerMangd.Varde}g per ${viktGram}g`);
}
