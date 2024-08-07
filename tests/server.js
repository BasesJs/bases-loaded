import { basesloaded } from "../dist/bases.js";
import { documenttype } from "../dist/core/document-types/documenttype.js";
import { document } from "../dist/core/document/document.js";
import { multirecordgroup } from "../dist/core/keywords/keywordgroup.js";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


LoadBases()
    .then(bases => { 
        
        document.get(149, true, true)
        .then((doc)=> {
            let myGroups = doc.multirecordgroups.filter((item) => item.typeGroupId == '116');
            console.log(myGroups);
        })
        .catch((err) => { console.error("failed: ", err.stack)})
        .finally(() => {
            bases.disconnect()
            .catch((err) => { console.error("")})
        })    
    })           
    .catch((err) => { console.error("Can not connect to OnBase: ", err.message)})


async function LoadBases(){
    console.log("Loading basesjs...");
    const bases = new basesloaded();
    await bases.connect("RESTAPI", "P@ssw0rd");
    return bases;
}

