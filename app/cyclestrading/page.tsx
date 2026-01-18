"use client";
import Stocks from "@/components/stcoks/stocks";
import { getStock, StockData } from "@/lib/finnhub";
import { useState, useEffect, useRef } from "react";

export default function CyclesTrading() {
  const didRun = useRef(false);

  const [stocks_6_1_26, setStocks_6_1_26] = useState<StockData[]>([]);
  useEffect(() => {
    if (!didRun.current) {
      didRun.current = true;
      loadstocks_6_1_26();
    }
  }, []);

  const loadstocks_6_1_26 = async (): Promise<void> => {
    CheckStocks("NFLX", true, 231); //TrendSpider
    CheckStocks("AMD", true, 82); //TrendSpider

    CheckStocks("USAR", true, 18.5); //Dark pool

    let APLD = await getStock("APLD"); //Hagit
    if (APLD != null) {
      APLD.TimeToBuy = APLD.IsUp;
      setStocks_6_1_26((prevItems) => [...prevItems, APLD]);
    }

    let EOSE = await getStock("EOSE"); //Dark pool
    if (EOSE != null) {
      EOSE.TimeToBuy = EOSE.IsUp && EOSE.CurrentPrice > 14;
      setStocks_6_1_26((prevItems) => [...prevItems, EOSE]);
    }

    let NVTS = await getStock("NVTS"); //Hagit
    if (NVTS != null) {
      NVTS.TimeToBuy = NVTS.IsUp && NVTS.CurrentPrice > 10.07;
      setStocks_6_1_26((prevItems) => [...prevItems, NVTS]);
    }

    let BABA = await getStock("BABA"); // TrendSpider
    if (BABA != null) {
      BABA.TimeToBuy = BABA.IsUp && BABA.CurrentPrice > 148;
      setStocks_6_1_26((prevItems) => [...prevItems, BABA]);
    }

    let OPEN = await getStock("OPEN"); // Dark ppl
    if (OPEN != null) {
      OPEN.TimeToBuy = OPEN.IsUp && OPEN.CurrentPrice > 6.73;
      setStocks_6_1_26((prevItems) => [...prevItems, OPEN]);
    }

    let RGTI = await getStock("RGTI"); // cycle trading
    if (RGTI != null) {
      RGTI.TimeToBuy = RGTI.CurrentPrice < 22 || RGTI.CurrentPrice > 26;
      setStocks_6_1_26((prevItems) => [...prevItems, RGTI]);
    }

    let RKLB = await getStock("RKLB"); //*cycle trading*
    if (RKLB != null) {
      RKLB.TimeToBuy = RKLB.CurrentPrice < 82 || RKLB.CurrentPrice > 86;
      setStocks_6_1_26((prevItems) => [...prevItems, RKLB]);
    }

    let RYAAY = await getStock("RYAAY"); //*cycle trading*
    if (RYAAY != null) {
      RYAAY.TimeToBuy = RYAAY.CurrentPrice < 68 || RYAAY.CurrentPrice > 74;
      setStocks_6_1_26((prevItems) => [...prevItems, RYAAY]);
    }

    let ANET = await getStock("ANET"); //*cycle trading*
    if (ANET != null) {
      ANET.TimeToBuy = ANET.IsUp && ANET.CurrentPrice > 131;
      setStocks_6_1_26((prevItems) => [...prevItems, ANET]);
    }

    let ORLY = await getStock("ORLY"); //*cycle trading*
    if (ORLY != null) {
      ORLY.TimeToBuy = ORLY.CurrentPrice < 90 || ORLY.CurrentPrice > 92.17;
      setStocks_6_1_26((prevItems) => [...prevItems, ORLY]);
    }

    let IREN = await getStock("IREN"); // Dark pool
    if (IREN != null) {
      IREN.TimeToBuy = IREN.IsUp && IREN.CurrentPrice > 53;
      setStocks_6_1_26((prevItems) => [...prevItems, IREN]);
    }

    const OKLO = await getStock("OKLO");
    if (OKLO != null) {
      OKLO.TimeToBuy = OKLO.IsUp && OKLO.CurrentPrice > 94; //Dark pool
      setStocks_6_1_26((prevItems) => [...prevItems, OKLO]);
    }

    const ONDS = await getStock("ONDS");
    if (ONDS != null) {
      ONDS.TimeToBuy =
        ONDS.IsUp && (ONDS.CurrentPrice < 11 || ONDS.CurrentPrice > 15); //Dark pool
      setStocks_6_1_26((prevItems) => [...prevItems, ONDS]);
    }

    const ASTS = await getStock("ASTS");
    if (ASTS != null) {
      ASTS.TimeToBuy = ASTS.IsUp; //Dark pool
      setStocks_6_1_26((prevItems) => [...prevItems, ASTS]);
    }

    const CRML = await getStock("CRML");
    if (CRML != null) {
      CRML.TimeToBuy = CRML.IsUp && CRML.CurrentPrice > 11; //Dark pool
      setStocks_6_1_26((prevItems) => [...prevItems, CRML]);
    }
  };

  const CheckStocks = async (symbol: string, IsUp: boolean, price: number) => {
    let stock = await getStock(symbol);
    if (stock != null) {
      if (stock.IsUp && IsUp && stock.CurrentPrice >= price) {
        stock.TimeToBuy = true;
      }

      setStocks_6_1_26((prevItems) => [...prevItems, stock]);
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
            January 6, 2026
          </span>
        </div>
      </div>
      {stocks_6_1_26.map((s) => (
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
          December 2, 2025
        </span>
      </div>
    </div>
  );
}
