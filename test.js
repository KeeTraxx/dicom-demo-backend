const daikon = require('daikon');
const { readFileSync } = require('node:fs');
daikon.Parser.verbose = true;
const image= daikon.Series.parseImage(new DataView(readFileSync('MR-IMG-301-1-130.dcm').buffer));

console.log(image.getTag(0x0010, 0x0030).value[0])
