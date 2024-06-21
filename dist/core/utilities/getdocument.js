import { _getbyid } from '../baseclass/basegroup.js';
import { document } from '../document/document.js';
const endpoint1 = "/documents";
export async function getDocument(id, getkeywords = true) {
    const data = await _getbyid(id, endpoint1);
    const doc = new document(data);
    const keywords = await _getbyid(id + "/keywords", endpoint1);
    console.log(keywords);
    if (getkeywords) {
    }
    return doc;
}
