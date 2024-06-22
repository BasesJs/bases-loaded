export class rendition {
    constructor(item: any) {
        this.comment = item.comment;
        this.created = item.created;
        this.createdByUserId = item.createdByUserId;
        this.fileTypeId = item.fileTypeId;
        this.pageCount = item.pageCount;
    }
    comment:string;
    created:string;
    createdByUserId:string;
    fileTypeId:string;
    pageCount:string;
}