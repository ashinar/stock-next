"use client";
import Stocks from "@/components/stcoks/stocks";
import { getStock, StockData } from "@/lib/finnhub";
import { useState, useEffect, useRef } from "react";

export default function GapReversal() {
  const didRun = useRef(false);

  const [stocks, setStocks] = useState<StockData[]>([]);
  useEffect(() => {
    if (!didRun.current) {
      didRun.current = true;
      CheckStocks();
    }
  }, []);

  //לאסוף את כל המניות שיש עליהם מידע מיוחד או שעשו דיווח
  const CheckStocks = async () => {
    IsBullishReversal("AGIG");
  };

  const IsBullishReversal = async (symbol: string) => {
    let stock = await getStock(symbol);
    if (stock != null) {
      //The Gap should be more than 4 but lest than  30
      if (
        stock.PreviousClose > stock.OpenPrice * 1.04 &&
        stock.PreviousClose < stock.OpenPrice * 1.3
      ) {
        stock.TimeToBuy = true;
        setStocks((prevItems) => [...prevItems, stock]);
      }
    }
  };

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
            Gap Reversal
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
            January 6, 2026
          </span>
        </div>
      </div>
      {stocks.map((s) => (
        <Stocks key={s.Symbol} stock={s} />
      ))}
    </div>
  );
}
