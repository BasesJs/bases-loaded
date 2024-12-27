import { Document } from "../../../dist/core/document/document.js";
export async function ModifyDocumentTest(bases, docid, keywordName, keywordValue) {
    const document = await Document.get(
        docid,
        {
            getKeywords: true,
            unmaskKeywords: true
        }
    );
    //Create a Keyword Colletction Modifier
    const keyMod = await document.createKeywordModifier();
    //Get the Keyword Type by calling the KeywordTypes endpoint
    let keyType; 
    if(bases.core.isHydrated){
        keyType = bases.KeywordTypes.items.find(kt => kt.name === keywordName)       
    }
    else{
        keyType = await KeywordTypes.get(keywordName);
    }
    //Or if the core is hydrated, you can get the keyword type by id
    const newKeyword = Keyword.parse(await keyType.create(keywordValue));
    
    //See if an Keyword value already exists
    const oldKeyword = document.keywordRecords.Keywords.find(kw => kw.typeId === keyType.id);
    if(oldKeyword === undefined){
        keyMod.addKeyword(newKeyword);
    }
    else{
        console.log("Keyword exists with value: ", oldKeyword.getValue());
        keyMod.updateKeyword(oldKeyword.getValue(), newKeyword);
    }
    const resp = await keyMod.apply();
    console.log(resp.status);
}