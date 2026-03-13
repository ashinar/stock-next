"use client";
import { useRef } from "react";
import Stocks from "@/components/stcoks/stocks";
import { getStock, StockData } from "@/lib/finnhub";
import { useState, useEffect } from "react";

export default function CyclesTrading() {
  const didRun = useRef(false);
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    if (!didRun.current) {
      didRun.current = true;
      loadTAStocks();
    }
  }, []);

  const loadTAStocks = async (): Promise<void> => {
    CheckStocks("MRNA", true, 55);
    CheckStocks("KTOS", true, 134);
    CheckStocks("OSCR", true, 23);

    CheckStocks("AA", true, 68);
    CheckStocks("AAOI", false, 115);
    CheckStocks("ADI", true, 313);
  };

  const CheckStocks = async (symbol: string, IsUp: boolean, price: number) => {
    let stock = await getStock(symbol);
    if (stock != null) {
      if (
        (stock.IsUp && IsUp && stock.CurrentPrice >= price) ||
        (!stock.IsUp && stock.CurrentPrice < price)
      ) {
        stock.TimeToBuy = true;
        setStocks((prevItems) => [stock, ...prevItems]);
      } else {
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
            Stocks
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
            Amir
          </span>
        </div>
      </div>
      {stocks && stocks.map((s) => <Stocks key={s.Symbol} stock={s} />)}
    </div>
  );
}
