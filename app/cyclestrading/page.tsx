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
      <div
        style={{
          padding: "30px 0 20px 0",
          borderBottom: "2px solid #f2f2f2",
          marginBottom: "25px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              margin: 0,
              color: "#222",
            }}
          >
            CyclesTrading Stocks
          </h1>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "400",
              marginTop: "5px",
              color: "#555",
            }}
          >
            Daily Signals Report
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <span
            style={{
              fontSize: "16px",
              padding: "4px 8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#f7f7f7",
              marginLeft: "20px",
              display: "inline-block",
              fontWeight: "520",
            }}
          >
            December 2, 2025
          </span>
        </div>
      </div>
      {stocks.map((s) => (
        <Stocks key={s.Symbol} stock={s} />
      ))}
    </div>
  );
}
