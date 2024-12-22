import { Document } from "../../dist/core/document/document.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require('fs');


export async function GetDocumentTest(docid, rendition = undefined, revision = undefined, outputPath = undefined) {
    try {
        console.log("----Testing Get Document----");
        let doc = await Document.get(docid);
        await doc.getKeywords();
        console.log("Stand alone Keyword count: ", doc.keywordCollection.Keywords);
        console.log("Single Instance Group Count: ", doc.keywordCollection.RecordGroups);
        console.log("Multi Instance Group Count: ", doc.keywordCollection.MultiRecordGroups);
        await doc.getNotes();        
        console.log("Notes Count: ", doc.notes.length);
        console.log(doc.notes[0]);
        await doc.getHistory();
        console.log("History Count: ", doc.history.length);
        await doc.getRevisions();
        console.log(doc.revisions);

        if (outputPath !== undefined) {
            let res = await doc.getContent(
                {
                    revisionId: revision,
                    renditionId: rendition,
                    contentParams: undefined,
                    accepts: "*/*"
                });
            const filePath = `${outputPath}/${docid}.pdf`;
            const buffer = Buffer.from(res.data); // Convert ArrayBuffer to Buffer
            fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    console.error('Error saving file:', err);
                } else {
                    console.log('File saved:', filePath);
                }
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}