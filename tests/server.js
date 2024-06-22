import { basesloaded } from "../dist/bases.js";



LoadBases()
    .then(bases => {
        console.log("Bases Loaded");
    })
    .then(()=>{
        bases.core.getDocument("149")
        .then((doc) =>{
            console.log(doc);
        })
        
    })    
    .catch((err) => { console.error(err)})

async function LoadBases(){
    console.log("Loading basesjs...");
    const bases = new basesloaded();
    let success = await bases.connect("MANAGER", "P@ssw0rd");
    return bases;
}

