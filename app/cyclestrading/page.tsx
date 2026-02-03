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
    CheckStocks("FRPT", true, 72); //Amir
    CheckStocks("USAR", true, 27.29); //Dark pool

    CheckStocks("NFLX", true, 87); //TrendSpider
    CheckStocks("AMD", true, 254); //TrendSpider

    let NVDA = await getStock("NVDA"); //*cycle trading*
    if (NVDA != null) {
      NVDA.TimeToBuy = NVDA.IsUp && NVDA.CurrentPrice < 160;
      setStocks_6_1_26((prevItems) => [...prevItems, NVDA]);
    }

    let AVGO = await getStock("AVGO"); //*cycle trading*
    if (AVGO != null) {
      AVGO.TimeToBuy = AVGO.IsUp && AVGO.CurrentPrice < 54;
      setStocks_6_1_26((prevItems) => [...prevItems, AVGO]);
    }

    let IONQ = await getStock("IONQ"); //*cycle trading*
    if (IONQ != null) {
      IONQ.TimeToBuy = IONQ.IsUp && IONQ.CurrentPrice > 48;
      setStocks_6_1_26((prevItems) => [...prevItems, IONQ]);
    }

    let EOSE = await getStock("EOSE"); //Dark pool
    if (EOSE != null) {
      EOSE.TimeToBuy = EOSE.IsUp && EOSE.CurrentPrice > 18;
      setStocks_6_1_26((prevItems) =>
        EOSE.TimeToBuy ? [EOSE, ...prevItems] : [...prevItems, EOSE],
      );
    }

    let NVTS = await getStock("NVTS"); //Hagit
    if (NVTS != null) {
      NVTS.TimeToBuy = NVTS.IsUp && NVTS.CurrentPrice > 11;
      setStocks_6_1_26((prevItems) =>
        NVTS.TimeToBuy ? [NVTS, ...prevItems] : [...prevItems, NVTS],
      );
    }

    let BABA = await getStock("BABA"); // TrendSpider
    if (BABA != null) {
      BABA.TimeToBuy = BABA.IsUp && BABA.CurrentPrice > 181;
      setStocks_6_1_26((prevItems) => [...prevItems, BABA]);
    }

    let OPEN = await getStock("OPEN"); // Dark ppl
    if (OPEN != null) {
      OPEN.TimeToBuy = OPEN.IsUp && OPEN.CurrentPrice > 6.73;
      setStocks_6_1_26((prevItems) => [...prevItems, OPEN]);
    }

    let RGTI = await getStock("RGTI"); // cycle trading
    if (RGTI != null) {
      RGTI.TimeToBuy = RGTI.IsUp && RGTI.CurrentPrice > 22;
      setStocks_6_1_26((prevItems) =>
        RGTI.TimeToBuy ? [RGTI, ...prevItems] : [...prevItems, RGTI],
      );
    }

    let RKLB = await getStock("RKLB"); //*cycle trading*
    if (RKLB != null) {
      RKLB.TimeToBuy = RKLB.CurrentPrice > 87;
      setStocks_6_1_26((prevItems) =>
        RKLB.TimeToBuy ? [RKLB, ...prevItems] : [...prevItems, RKLB],
      );
    }

    let RYAAY = await getStock("RYAAY"); //*cycle trading*
    if (RYAAY != null) {
      RYAAY.TimeToBuy = RYAAY.IsUp && RYAAY.CurrentPrice > 71;
      setStocks_6_1_26((prevItems) =>
        RYAAY.TimeToBuy ? [RYAAY, ...prevItems] : [...prevItems, RYAAY],
      );
    }

    let ANET = await getStock("ANET"); //*cycle trading*
    if (ANET != null) {
      ANET.TimeToBuy = ANET.IsUp;
      setStocks_6_1_26((prevItems) =>
        ANET.TimeToBuy ? [ANET, ...prevItems] : [...prevItems, ANET],
      );
    }

    let ORLY = await getStock("ORLY"); //*cycle trading*
    if (ORLY != null) {
      ORLY.Description = "דיווח ב4.2";
      ORLY.TimeToBuy = ORLY.IsUp;
      setStocks_6_1_26((prevItems) =>
        ORLY.TimeToBuy ? [ORLY, ...prevItems] : [...prevItems, ORLY],
      );
    }

    let IREN = await getStock("IREN"); // Dark pool
    if (IREN != null) {
      IREN.TimeToBuy = IREN.IsUp && IREN.CurrentPrice > 59;
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
      ASTS.TimeToBuy = ASTS.IsUp && ASTS.CurrentPrice > 120; //Dark pool
      setStocks_6_1_26((prevItems) => [...prevItems, ASTS]);
    }

    const CRML = await getStock("CRML");
    if (CRML != null) {
      CRML.TimeToBuy = CRML.IsUp && CRML.CurrentPrice > 19; //Dark pool
      setStocks_6_1_26((prevItems) => [...prevItems, CRML]);
    }
  };

  const CheckStocks = async (symbol: string, IsUp: boolean, price: number) => {
    let stock = await getStock(symbol);
    if (stock != null) {
      if (stock.IsUp && IsUp && stock.CurrentPrice >= price) {
        stock.TimeToBuy = true;
        setStocks_6_1_26((prevItems) => [stock, ...prevItems]);
      } else {
        setStocks_6_1_26((prevItems) => [...prevItems, stock]);
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
