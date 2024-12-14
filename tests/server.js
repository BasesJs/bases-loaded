import { BasesLoaded } from "../dist/bases.js"; 
import { Document } from "../dist/core/document/document.js";
import { FileType } from "../dist/core/file-types/filetype.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config(); 

try{
    //bases object goe into global scope
    const bases = await LoadBases()
    let bg = await FileType.bestGuess("png");
    let fileType = await FileType.get(bg);
    console.log(fileType);
    bases.disconnect();
}
catch(e){
    console.error(e.message);
}

async function LoadBases(){
    console.log("Loading basesjs...");
    const bases = new BasesLoaded();
    await bases.connect("RESTAPI", "P@ssw0rd");
    return bases;
}
