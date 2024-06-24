import { basesloaded } from "../dist/bases.js";
import { documenttype } from "../dist/core/document-types/documenttype.js";
import { document } from "../dist/core/document/document.js";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

LoadBases()
    .then(bases => {
        console.log("Bases Loaded");  
        document.get(149, true, true)
        .then((doc) => { console.log(doc.multirecordgroups) })  
        .finally(() => {
            bases.disconnect()
            .catch((err) => { console.error(err.request.path, err.response.status, err.message)})
        })    
    })           
    .catch((err) => { console.error("Can not connect to OnBase: ", err.message)})
    

async function LoadBases(){
    console.log("Loading basesjs...");
    const bases = new basesloaded();
    let success = await bases.connect("RESTAPI", "P@ssw0rd");
    return bases;
}

