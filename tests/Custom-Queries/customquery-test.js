import { CustomQuery } from "../../dist/core/custom-queries/customquery.js";
import { CustomQueries } from "../../dist/core/custom-queries/customqueries.js";
export async function CustomQueryTest(){
    console.warn("----Custom Query Test----");
    let results = await CustomQueries.get();
    console.info(`Retrieved all custom queries, there are ${results.length} queries in your system.`);
    let cq = await CustomQuery.get(results[0].id);
    let keywords = await cq.getKeywordTypes();
    keywords.forEach(kw => {
        console.info(`Keyword ${kw.id}:`);
    });
    console.info(`Retrieved custom query with id ${cq.id}`);
    console.warn("----End of Custom Query Test----");
}