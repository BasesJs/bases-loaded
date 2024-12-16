import { BasesLoaded } from "../dist/bases.js";
import { AuthTest } from "./Authentication/Auth-Test.js";
import { AFKSTest } from "./Autofll-Keysets/AFKS-Test.js";
import { CustomQueryTest } from "./Custom-Queries/customquery-test.js";
import { getContent, ContentParams, ContentFit, ContentContext } from "../dist/core/document/content/documentcontent.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require('fs');
require('dotenv').config();

const bases = await LoadBases();
try {
    const requestOptions = new RequestOptions(
        HttpMethod.GET, "https://dev-onbase/api/onbase/core/session/heartbeat", DefaultHeaders(), '');
    //await AuthTest();
    //await AFKSTest("117", "INV-34-5056");
    //await CustomQueryTest();
    // let params = new ContentParams(undefined, ContentContext.Download, undefined, undefined, undefined);
    // let res = await getContent("149", "latest", "default", undefined, "application/pdf");
    // if (res.status === 200) {
    //     const filePath = 'test.pdf';
    //     console.log(res.data);
    //     const buffer = Buffer.from(res.data); // Convert ArrayBuffer to Buffer
    //     fs.writeFile(filePath, buffer, (err) => {
    //         if (err) {
    //             console.error('Error saving file:', err);
    //         } else {
    //             console.log('File saved:', filePath);
    //         }
    //     });
    // }
    
}
catch (e) {
    console.error(e.message);
}
finally {
    bases.disconnect()
        .catch(e => console.error("Something went wrong while disconnecting", e.message));
}

/*----CALL THIS FUNCTION TO LOGIN----------*/
export async function LoadBases() {
    console.log("Loading basesjs...");
    const bases = new BasesLoaded();
    await bases.connect("RESTAPI", "P@ssw0rd");
    return bases;
}
