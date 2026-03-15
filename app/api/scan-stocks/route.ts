//  http://localhost:3000/api/scan-stocks
//https://financialmodelingprep.com/stable/profile?symbol=AAPL&apikey=8OjFIRUUXYFUbSLsgI4EKN38d8wNoLWo

import stocks from "@/components/stcoks/stocks";
import { getFinancialModelStock } from "@/lib/financialmodelingprep";
import { getFinnhubStock } from "@/lib/finnhub";

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
      percentage: stock.changePercentage.toFixed(2),
    });
  }

  symbol = "AAOI";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 114) {
    arrStocks.push({
      symbol,
      description: "Cycle Trading",
      percentage: stock.changePercentage.toFixed(2),
    });
  }

  symbol = "GS";
  stock = await getFinnhubStock(symbol);
  if (stock && (stock.CurrentPrice > 843 || (stock.Low < 733 && stock.IsUp))) {
    arrStocks.push({
      symbol,
      description: "Cycle Trading",
      percentage: stock.Change.toFixed(2),
    });
  }

  symbol = "VLO";
  stock = await getFinnhubStock(symbol);
  if (
    stock &&
    ((stock.IsUp && stock.CurrentPrice > 240) ||
      (stock.Low < 208 && stock.IsUp))
  ) {
    arrStocks.push({
      symbol,
      description: "Cycle Trading",
      percentage: stock.Change.toFixed(2),
    });
  }

  symbol = "LRCX";
  stock = await getFinnhubStock(symbol);
  if (stock && ((stock.IsUp && stock.CurrentPrice > 212) || stock.Low < 180)) {
    arrStocks.push({
      symbol,
      description: "Cycle Trading",
      percentage: stock.Change.toFixed(2),
    });
  }

  symbol = "AMZN";
  stock = await getFinancialModelStock(symbol);
  if (stock.price > 225) {
    arrStocks.push({
      symbol,
      description: "Cycle Trading",
      percentage: stock.changePercentage.toFixed(2),
    });
  }

  symbol = "RKLB";
  stock = await getFinnhubStock(symbol);
  if (stock && ((stock.IsUp && stock.CurrentPrice > 73) || stock.Low < 63)) {
    arrStocks.push({
      symbol,
      description: "Cycle Trading",
      percentage: stock.Change.toFixed(2),
    });
  }

  symbol = "NFLX";
  stock = await getFinancialModelStock(symbol);
  if (stock && stock.price > 95) {
    arrStocks.push({
      symbol,
      description: "Cycle Trading",
      percentage: 0,
    });
  }

  let res = await CheckStocksUpAndDown("SOFI", 18, 16.8, "Cycle Trading");
  res && arrStocks.push({ res });

  res = await CheckStocksUpAndDown("LMND", 56, 48, "Cycle Trading");
  res && arrStocks.push({ res });

  res = await CheckStocksUpAndDown("AMD", 199, 188, "Cycle Trading");
  res && arrStocks.push({ res });

  res = await CheckStocksUpAndDown("PLTR", 161, 126, "Cycle Trading");
  res && arrStocks.push({ res });

  //symbol = "AAOI";
  return Response.json({ stocks: arrStocks });
}

const CheckStocksUpAndDown = async (
  symbol: string,
  upPrice: number,
  downPrice: number,
  description: string,
) => {
  if (symbol) {
    let stock = await getFinnhubStock(symbol);

    if (stock && (stock.CurrentPrice > upPrice || stock.Low < downPrice)) {
      return {
        symbol,
        description,
        percentage: stock.Change && stock.Change.toFixed(2),
      };
    }
  }
  return false;
};
