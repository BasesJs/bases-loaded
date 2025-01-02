import { AuthenticationTest } from "./Authentication/Auth-Test.js";
import { createRequire } from "module";
import { Core } from "../dist/core/core.js";
import { Bases } from "../dist/bases.js";
import { Storage } from "../dist/core/storage/storage.js";
const require = createRequire(import.meta.url);
require('dotenv').config();
const events = require('events');
events.EventEmitter.defaultMaxListeners = 25;

const bases = await AuthenticationTest("RESTAPI", "P@ssw0rd");
try {    
    const docImport = await Storage.createDocumentImport("209", ["tests\\resources\\NPS_PS_Intro.mp4"], new Date());
    const invNumKt = await Core.KeywordTypes.get("Invoice Number");
    const invNumKw = await invNumKt.create(`INV-2025-${Math.floor(1000 + Math.random() * 9000)}`);
    const custPOKt = await Core.KeywordTypes.get("Customer PO");
    const custPOKw = await custPOKt.create(`PO-2025-${Math.floor(1000 + Math.random() * 9000)}`);
    const amtKt = await Core.KeywordTypes.get("Amount");
    const amtKw = await amtKt.create("10000.00");
    const dueKt = await Core.KeywordTypes.get("Due Date");
    const dueKw = await dueKt.create("2/5/2025");

    docImport.KeywordCollection.addKeyword(invNumKw);
    docImport.KeywordCollection.addKeyword(custPOKw);
    docImport.KeywordCollection.addKeyword(amtKw);
    docImport.KeywordCollection.addKeyword(dueKw);

    //console.log(JSON.stringify(docImport.KeywordCollection));
    await Storage.import(docImport, progressUpdate);
    
}
catch (error) {
    console.error(error);
}
finally {
    console.log("Disconnecting...");
    await Bases.instance.disconnect();
}

function progressUpdate(progress) {
    console.log(`Import Progress: ${progress}%`);
  }