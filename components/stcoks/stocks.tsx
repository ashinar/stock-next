import { StockData } from "@/lib/finnhub";
import styles from "./stocks.module.css";
import Image from "next/image";

export default function stocks({ stock }: { stock: StockData }) {
  const isUp = stock.Change >= 0;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(stock.Symbol);
  };

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

        <div className={styles.symbol} title={stock.Description}>
          <a
            onClick={() => {
              copyToClipboard();
            }}
          >
            <span>📋</span>
            {stock.Symbol}
          </a>
        </div>
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
