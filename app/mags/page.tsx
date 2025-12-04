import Stocks from "@/components/stcoks/stocks";
import { getStock, StockData } from "@/lib/finnhub";

export default async function Mags() {
  const stocks: StockData[] = [];

  let stock = await getStock("MAGS", "/stocks/mags.png");
  if (stock != null) {
    stock.TimeToBuy = stock.CurrentPrice > 69 || stock.CurrentPrice < 67;

    stocks.push(stock);
  }

  stock = await getStock("GOOGL", "/stocks/google.jpg");
  if (stock != null) {
    stock.TimeToBuy = stock.CurrentPrice > 328 || stock.CurrentPrice < 320;

    stocks.push(stock);
  }

  // stock = await getStock("AAPL", "/stocks/AAPL.png");
  // if (stock != null) {
  //   stock.TimeToBuy = stock.CurrentPrice > 328 || stock.CurrentPrice < 320;

  //   stocks.push(stock);
  // }

  return (
    <div>
      {stocks.map((s) => (
        <Stocks key={s.Symbol} stock={s} />
      ))}
    </div>
  );
}
