const basesloaded = require('./bases');
const documentupload = require('./core/upload/documentupload');
const keywordcollection = require('./core/keywords/keywordcollection');
const fs = require('node:fs');


LoadBases()
    .then(bases => {
        console.log("Bases Loaded");
    })
    .then(()=>{
        let file = fs.readFileSync('./resources/NPS_PS_Intro.mp4');
        documentupload.create(file, 'mp4', 'SYS Unidentified Items')
        .then(docupload => {            
            docupload.documentinfo.keywordCollection.addKeyword("Description", ["Success"]) //pathetically lacking
            .then(()=>{
                docupload.uploadParts() // figure out if we can still send all parts at once / loop
                .then(()=>{
                    docupload.post()
                    .then(resp =>{
                        console.log(resp.data);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                })
            })
        })     
    })

async function LoadBases(){
    console.log("Loading basesjs...");
    const bases = new basesloaded();
    let success = await bases.connect("Template.Service", "ENR4RjYZr2jZH48VxW2V28Zqz");
    return bases;
}