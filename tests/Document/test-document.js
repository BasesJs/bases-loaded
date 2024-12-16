import { getContent, ContentParams, ContentFit, ContentContext } from "../dist/core/document/content/documentcontent.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require('fs');
// let params = new ContentParams(undefined, ContentContext.Download, undefined, undefined, undefined);
//     let docid = "150";
//     bases.core.getDocument(docid).then(doc => {        
//         console.log({...doc});
//     });
    //     let res = getContent(doc.id, "latest", "default", params, "application/pdf");
    // let res = await getContent(docid, "latest", "default", params, "application/pdf");
    // console.log(res.status);
    // const filePath = `test-${docid}.pdf`;
    // const buffer = Buffer.from(res.data); // Convert ArrayBuffer to Buffer
    // fs.writeFile(filePath, buffer, (err) => {
    //     if (err) {
    //         console.error('Error saving file:', err);
    //     } else {
    //         console.log('File saved:', filePath);
    //     }
    //});