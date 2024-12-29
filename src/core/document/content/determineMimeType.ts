import { Config } from '../../../config/config.js';
import { RetrievalOptions } from './documentcontent.js';
import { Document } from "../document.js";

export async function determineMimeType(document:Document, retrievalOptions: RetrievalOptions): Promise<RetrievalOptions> {
    let revision = document.revisions.find(rev => rev.id === retrievalOptions.revisionId);
      if(!revision){
        await document.getRevisions();
        revision = document.revisions.find(rev => rev.id === retrievalOptions.revisionId);
        if(!revision){
          throw new Error("Revision does not exist.");
        }
      }
      let rendition:string;
      if(retrievalOptions.renditionId !== "default"){
        rendition = revision.renditions.find(rend => rend.fileTypeId === retrievalOptions.renditionId)?.fileTypeId ?? "default";
        if(rendition === "default"){
            if(document.documentType?.defaultFileTypeId){
                rendition = document.documentType.defaultFileTypeId;
                retrievalOptions.renditionId = "default";
              }
        }    
      }
      else{
        rendition = document.documentType?.defaultFileTypeId ?? "16";
      }        
      let mimeconfig = Config.core.fileTypeMimeMap.find(item => item.id === rendition);
      if(retrievalOptions.accepts === "*/*"){
        retrievalOptions.accepts = mimeconfig?.mime ?? "*/*";
      }      
      if(retrievalOptions.fileExtension === undefined){
        if(rendition === "2"){
            retrievalOptions.fileExtension = Config.core.imageFileFormatPreference ?? mimeconfig?.ext;
          } 
          else{
            retrievalOptions.fileExtension = mimeconfig?.ext;
          }
      }           
      return retrievalOptions;
}