import {AuthenticationTest } from "./Authentication/Auth-Test.js";
import { GetDocumentTest } from "./Document/get-document/test-get-document.js";
import { ModifyDocumentTest } from "./Document/modify-document/test-modify-document.js";
import { createRequire } from "module";
import { Core } from "../dist/core/core.js";
import { Bases } from "../dist/bases.js";
import { DocumentTypes } from "../dist/core/document-types/documenttypes.js";
const require = createRequire(import.meta.url);
require('dotenv').config();

const events = require('events');
events.EventEmitter.defaultMaxListeners = 10;
const bases = await AuthenticationTest("RESTAPI", "P@ssw0rd");
try {    
    const doc = await Core.getDocument("150", {
        getKeywords: true,
        unmaskKeywords: true,
        getRevisions: false,
        getNotes: false,
        getHistory: false
    });    

    const keyMod = await doc.createKeywordModifier();
    const keyType = Core.KeywordTypes.items.find(kt => kt.name === "customer Id");
    const newKeyword = keyType.create(["INV1221221", "INV321-12345"]);
    const existingKeyword = doc.keywordRecords.Keywords.find(kw => kw.typeId === keyType.id);
    if(existingKeyword.hasValue()){
        console.log("Keyword exists with value: ", existingKeyword.getValue());
        await keyMod.updateKeyword(existingKeyword.getValue(), newKeyword);
    }
    else{
        await keyMod.addKeyword(newKeyword);
    }  
    console.log("Keywords in Keymod: ", {...keyMod.items[0].keywords[0]});
    //await keyMod.apply();

}
catch (error) {
    console.error(error);
}
finally {
    console.log("Disconnecting...");
    await Bases.instance.disconnect();
}
