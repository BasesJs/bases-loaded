import { rendition } from './rendition.js';

export class revision {
    constructor(id:string, revisionNumber:string){
        this.id = id;
        this.revisionNumber = revisionNumber;
    }
    id:string;
    revisionNumber:string;
    rendtions:rendition[] = [];
}