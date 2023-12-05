const filetypes = require('./file-types/filetypes');
const doctypegroups = require('./document-type-groups/documenttypegroups');
const autofillkeysets = require('./autofill-keysets/autofillkeysets');
const customqueries = require('./custom-queries/customqueries');
const doctypes = require('./document-types/documenttypes');
const keytypegroups = require('./keyword-type-groups/keywordtypegroups');
const keytypes = require('./keyword-types/keywordtypes');
const notetypes = require('./note-types/notetypes');
const stageupload = require('./upload/stageupload');
const uploadPart = require('./upload/uploadpart');
const deleteUpload = require('./upload/deleteupload');
const splitFile = require('./utilities/splitFile');

const core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    filetypes: filetypes,
    doctypegroups: doctypegroups,
    doctypes: doctypes,
    keytypegroups: keytypegroups,
    keytypes: keytypes,
    autofillkeysets: autofillkeysets,
    customqueries: customqueries,
    notetypes: notetypes,
    stageupload: stageupload,
    uploadPart: uploadPart,
    async fileUpload(fileExtention, file, documentTypeName){        
        console.log('staging....')
        let stageResp = await stageupload(fileExtention, file.byteLength);
        console.log(stageResp);
        console.log('splitting file into parts...');
        //console.log(file);
        let parts = await splitFile(file, stageResp.filePartSize, stageResp.numberOfParts);
        console.log(parts);
        console.log('Uploading Parts...')
        for(let i =0; i < parts.length; i++){
            let part = parts[i];
            console.log(`Uploading Part ${part.partNum}`);
            let resp = await uploadPart(stageResp.id,part.partNum,part.bytes);
            console.log(resp);
        }
        /*parts.forEach(part => {
            uploadPart(stageResp.id,part.partNum,part.bytes)
            .then(()=>{
                console.log(`Part ${part.partNum} has been uploaded.`)
            })
            .catch(err =>{
                console.log(`Part ${part.partNum} has failed.`);
                //console.log(err);
                return;
            })
        });*/        
    }
}
module.exports = core;
