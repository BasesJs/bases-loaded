import { Document } from "../../../dist/core/document/document.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require('fs');

export async function GetDocumentTest(docid, rendition = undefined, revision = undefined, outputPath = undefined) {
    try {
        console.log("----Testing Get Document----");
        let doc = await Document.get(docid);
        await doc.getKeywords();
        console.log("Stand alone Keyword count: ", doc.keywordRecords.Keywords.length);
        console.log("Single Instance Group Count: ", doc.keywordRecords.RecordGroups.length);
        console.log("Multi Instance Group Count: ", doc.keywordRecords.MultiRecordGroups.length);
        await doc.getNotes();        
        console.log("Notes Count: ", doc.notes.length);
        await doc.getHistory();
        console.log("History Count: ", doc.history.length);
        await doc.getRevisions();
        console.log("Revisions Count: ", doc.revisions.length);

        if (outputPath !== undefined) {
            let res = await doc.getContent(
                {
                    revisionId: revision,
                    renditionId: rendition
                });
            const filePath = `${outputPath}/${docid}.${doc.fileExtension}`;
            const buffer = Buffer.from(res.data); // Convert ArrayBuffer to Buffer
            fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    console.error('Error saving file:', err);
                } else {
                    console.log('File saved:', filePath);
                }
            });
        }
        return doc;
    }
    catch (error) {
        console.error(error);
    }
    
}