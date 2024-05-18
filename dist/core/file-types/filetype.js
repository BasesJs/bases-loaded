import base from '../baseclass/baseclass.js';
export class filetype extends base {
    constructor(item) {
        super(item.id, item.name, item.systemName);
    }
}
