import { CurrencyFormats } from "../../dist/core/currency-format/currencyformats.js";
import { CurrencyFormat } from "../../dist/core/currency-format/currencyformat.js";

export async function CurrencyFormatTest(){
  console.log('-----------Testing Currency Formats----------');
  let cfs = await CurrencyFormats.get("USD");
  console.log(cfs);
  let cf = await CurrencyFormat.get("1002");
  console.log(cf);  
}