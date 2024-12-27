import { LoadBases } from "./Authentication/Auth-Test.js";
import { GetDocumentTest } from "./Document/get-document/test-get-document.js";
import { ModifyDocumentTest } from "./Document/modify-document/test-modify-document.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config();

const bases = await LoadBases("RESTAPI", "P@ssw0rd");
try {
    ModifyDocumentTest(bases, "150", "Customer PO", "PO2024-4032");
}
catch (error) {
    console.error(error);
}
finally {
    await bases.disconnect();
}
