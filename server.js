const basesloaded = require('./bases');
const fs = require('node:fs');
const splitFile = require('./core/utilities/splitFile');


LoadBases()
    .then(bases => {
        console.log("Bases Loaded");
    })
    .then(()=>{
        let file = fs.readFileSync('./resources/NPS_PS_Intro.mp4');
        let stats = fs.statSync('./resources/NPS_PS_Intro.mp4');
        console.log('ByteLength: ' + file.byteLength);
        console.log('File Stats Size: ' + stats.size);
        bases.core.fileUpload('mp4', file, 'SYS Unidentified Items')
    })

async function LoadBases(){
    console.log("Loading basesjs...");
    const bases = new basesloaded();
    let success = await bases.connect("Template.Service", "ENR4RjYZr2jZH48VxW2V28Zqz");
    return bases;
}