import Stocks from "@/components/stcoks/stocks";
import { getStock } from "@/lib/finnhub";

export default async function Mags() {
  let stocks = [];

  const stock = await getStock("MAGS", "/stocks/mags.png");
  if (stock == null) {
    return null;
  }

  stock.TimeToBuy =
    stock.CurrentPrice > 67.26 ||
    (stock.CurrentPrice > 62 && stock.CurrentPrice < 65);

  stocks.push(stock);

  return (
    <div>
      {stocks.map((s) => (
        <Stocks key={s.Symbol} stock={s} />
      ))}
    </div>
  );
}
