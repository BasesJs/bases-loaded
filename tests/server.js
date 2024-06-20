import { basesloaded } from "../dist/bases.js";



LoadBases()
    .then(bases => {
        console.log("Bases Loaded");
    })
    .then(()=>{
        bases.core.documenttypes.getbyid('209')
        .then((dts) =>{
            console.log(dts);
            dts.keywordTypes()
            .then((kts) => {
                console.log(kts);
            })
        })  
        /*let file = fs.readFileSync('./resources/NPS_PS_Intro.mp4');
        documentupload.create(file, 'mp4', 'SYS Unidentified Items', new Date())
        .then((docupload) => {            
            docupload.documentinfo.kseywordCollection.addKeyword("Description", ["Success"]) //pathetically lacking
            .then(()=>{
                docupload.uploadParts() // figure out if we can still send all parts at once / loop
                .then(()=>{
                    docupload.post()
                    .then((resp) =>{
                        console.log(resp.data);
                    })
                    .then(()=>{
                        bases.disconnect()
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                })
            })
            .catch(err => console.log(err.message))
        })     */
    })    
    .catch((err) => { console.error(err)})

async function LoadBases(){
    console.log("Loading basesjs...");
    const bases = new basesloaded();
    let success = await bases.connect("MANAGER", "P@ssw0rd");
    return bases;
}

