import { StockData } from "@/lib/finnhub";
import styles from "./stocks.module.css";
import Image from "next/image";

export default function stocks({ stock }: { stock: StockData }) {
  const isUp = stock.Change >= 0;

  return (
    <div className={styles.row}>
      <div className={styles.symbolWrapper}>
        {stock.Img ? (
          <Image
            src={stock.Img}
            alt={stock.Symbol}
            width={32}
            height={32}
            className={styles.logo}
          />
        ) : null}

        <div className={styles.symbol}>{stock.Symbol}</div>
      </div>
      {stock.TimeToBuy ? (
        <div className={styles.buy}>Time to Buy</div>
      ) : (
        <div className={styles.price}></div>
      )}

      <div className={styles.price}>Price: {stock.CurrentPrice}</div>

      <div className={isUp ? styles.green : styles.red}>
        Change: {stock.Change}
      </div>

      <div className={isUp ? styles.green : styles.red}>
        Percent: {stock.Percent.toFixed(2)}%
      </div>
    </div>
  );
}
