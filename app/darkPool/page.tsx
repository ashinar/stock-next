"use client";
import Stocks from "@/components/stcoks/stocks";
import { getStock, StockData } from "@/lib/finnhub";
import { useState, useEffect, useRef } from "react";

/*buy
 SNDK
 SOXX
CRML
SNDK
*/
export default function DarkPool() {
  const didRun = useRef(false);

  const [stocks, setStocks] = useState<StockData[]>([]);
  useEffect(() => {
    if (!didRun.current) {
      didRun.current = true;
      loadstocks();
    }
  }, []);

  const loadstocks = async (): Promise<void> => {
    CheckStocks("SOFI", true, 18);

    CheckStocks("IREN", false, 36);
    CheckStocks("KTOS", true, 81);
    CheckStocks("HIMS", true, 13);
    CheckStocks("ONDS", false, 9.8);
    CheckStocks("IONQ", false, 35);

    CheckStocks("OSS", true, 9.5);
    CheckStocks("OKLO", false, 58);
    CheckStocks("PLTR", false, 148);
    CheckStocks("SNDK", true, 538);
  };

  const CheckStocks = async (symbol: string, IsUp: boolean, price: number) => {
    let stock = await getStock(symbol);
    if (stock != null) {
      if (
        (stock.IsUp && IsUp && stock.CurrentPrice >= price) ||
        (!stock.IsUp && !IsUp && stock.CurrentPrice < price)
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
            Dark Pool Stocks
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
            January 27, 2026
          </span>
        </div>
      </div>
      {stocks.map((s) => (
        <Stocks key={s.Symbol} stock={s} />
      ))}

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
          January 27, 2026
        </span>
      </div>
    </div>
  );
}
