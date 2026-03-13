"use client";

import { useState, useRef } from "react";
import styles from "./CupScannerClient.module.css";

type StockResult = {
  symbol: string;
  pivot: number;
};

export default function CupScannerClient() {
  const [stocks, setStocks] = useState<StockResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const abortRef = useRef(false);

  const tickers = ["MRNA"];

  const scanMarket = async () => {
    setLoading(true);
    setStocks([]);
    setProgress({ current: 0, total: tickers.length });
    abortRef.current = false;

    const found: StockResult[] = [];

    for (let i = 0; i < tickers.length; i++) {
      if (abortRef.current) break;

      const ticker = tickers[i];

      try {
        const res = await fetch(`/api/scan-cup?ticker=${ticker}`);
        const data = await res.json();

        if (data && data.pivot) {
          found.push(data);
        }
      } catch (err) {
        console.error(`Error fetching ${ticker}:`, err);
      }

      setProgress({ current: i + 1, total: tickers.length });
    }

    setStocks(found);
    setLoading(false);
  };

  const cancelScan = () => {
    abortRef.current = true;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cup & Handle Scanner</h2>

      <div className={styles.buttons}>
        <button
          onClick={scanMarket}
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Scanning..." : "Start Scan"}
        </button>
        {loading && (
          <button
            onClick={cancelScan}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
        )}
      </div>

      {loading && (
        <div className={styles.progress}>
          Scanning {progress.current} / {progress.total} tickers...
        </div>
      )}

      <ul className={styles.list}>
        {stocks.map((s) => (
          <li key={s.symbol} className={styles.listItem}>
            <strong>{s.symbol}</strong> – Pivot: {s.pivot.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
