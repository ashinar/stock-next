//  http://localhost:3000/api/scan-stocks
//https://financialmodelingprep.com/stable/profile?symbol=AAPL&apikey=8OjFIRUUXYFUbSLsgI4EKN38d8wNoLWo

import stocks from "@/components/stcoks/stocks";
import { getFinancialModelStock } from "@/lib/financialmodelingprep";

export async function GET() {
  let arrStocks = [];

  let symbol = "MRNA";
  let stock = await getFinancialModelStock(symbol);
  if (stock.price > 59) {
    arrStocks.push(symbol);
  }

  symbol = "KTOS";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 133) {
    arrStocks.push({ symbol });
  }

  symbol = "OSCR";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 23) {
    arrStocks.push({ symbol });
  }

  symbol = "KR";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 76) {
    arrStocks.push({ symbol, description: "Cup and Handle" });
  }

  symbol = "DASH";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 285) {
    arrStocks.push({ symbol, description: "Cup and Handle" });
  }

  symbol = "MRNA";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 59) {
    arrStocks.push({ symbol, description: "Cup and Handle" });
  }

  symbol = "KTOS";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 133) {
    arrStocks.push({ symbol, description: "Cup and Handle" });
  }

  symbol = "OSCR";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 23) {
    arrStocks.push({ symbol, description: "Cup and Handle" });
  }

  symbol = "BMNR";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 20) {
    arrStocks.push({
      symbol,
      description: "There may be a trend reversal, need Price Structure",
    });
  }

  return Response.json({ stocks: arrStocks });
}
