import Stocks from "@/components/stcoks/stocks";
import { getStock, StockData } from "@/lib/finnhub";

export default async function CyclesTrading() {
  const stocks: StockData[] = [];

  let stock = await getStock("LMB");
  if (stock != null) {
    stock.TimeToBuy = stock.CurrentPrice > 72.67;
    stocks.push(stock);
  }

  stock = await getStock("COMP");
  if (stock != null) {
    stock.TimeToBuy = stock.CurrentPrice < 10.3 && stock.Change >= 0;
    stocks.push(stock);
  }

  stock = await getStock("ATO");
  if (stock != null) {
    stock.TimeToBuy = stock.CurrentPrice < 171 && stock.Change >= 0;
    stocks.push(stock);
  }

  stock = await getStock("OKLO");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0;
    stocks.push(stock);
  }

  stock = await getStock("TPL");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice > 921.8;
    stocks.push(stock);
  }

  stock = await getStock("ROK");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 382;
    stocks.push(stock);
  }

  stock = await getStock("NVDA");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 184.85;
    stocks.push(stock);
  }

  stock = await getStock("AAPL");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 268;
    stocks.push(stock);
  }

  stock = await getStock("ORCL");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0;
    stocks.push(stock);
  }

  stock = await getStock("AGI");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0;
    stocks.push(stock);
  }

  stock = await getStock("INTR");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 8.5;
    stocks.push(stock);
  }

  stock = await getStock("ARKK");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice > 8.5;
    stocks.push(stock);
  }

  stock = await getStock("FROG");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice > 62;
    stocks.push(stock);
  }

  stock = await getStock("TEVA");
  if (stock != null) {
    stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 26;
    stocks.push(stock);
  }

  return (
    <div>
      <div style={{ marginLeft: "2%" }}>
        <h1 style={{ fontWeight: "bold" }}>CyclesTrading Stocks</h1>
        <div
          style={{
            background: "#7d7d7d",
            border: "1px solid #000",
            display: "inline",
            padding: "4px",
          }}
        >
          December 2, 2025
        </div>
      </div>
      {stocks.map((s) => (
        <Stocks key={s.Symbol} stock={s} />
      ))}
    </div>
  );
}
