"use client";
import Stocks from "@/components/stcoks/stocks";
import { getStock, StockData } from "@/lib/finnhub";
import { useState, useEffect } from "react";

export default function CyclesTrading() {
  const [stocks_6_1_26, setStocks_6_1_26] = useState<StockData[]>([]);
  useEffect(() => {
    if (!stocks_6_1_26.length) {
      loadstocks_6_1_26();
    }
  }, []);

  const loadstocks_6_1_26 = async (): Promise<void> => {
    debugger;
    let RYAAY = await getStock("RYAAY"); // cycle trading
    if (RYAAY != null) {
      RYAAY.TimeToBuy = RYAAY.CurrentPrice < 69;
      setStocks_6_1_26((prevItems) => [...prevItems, RYAAY]);
    }

    let RGTI = await getStock("RGTI"); // cycle trading
    if (RGTI != null) {
      RGTI.TimeToBuy = RGTI.CurrentPrice < 25;
      setStocks_6_1_26((prevItems) => [...prevItems, RGTI]);
    }

    let ANET = await getStock("ANET"); // cycle trading
    if (ANET != null) {
      ANET.TimeToBuy = ANET.CurrentPrice > 131;
      setStocks_6_1_26((prevItems) => [...prevItems, ANET]);
    }
    let RKLB = await getStock("RKLB"); // cycle trading
    if (RKLB != null) {
      RKLB.TimeToBuy = RKLB.CurrentPrice < 82;
      setStocks_6_1_26((prevItems) => [...prevItems, RKLB]);
    }
    // let LMB = await getStock("LMB"); // cycle trading
    // if (LMB != null) {
    //   LMB.TimeToBuy = LMB.Change > 0;
    //   setstocks_6_1_26((prevItems) => [...prevItems, LMB]);
    // }
    // let COMP = await getStock("LMB"); // cycle trading
    // if (COMP != null) {
    //   COMP.TimeToBuy = COMP.Change > 0;
    //   setstocks_6_1_26((prevItems) => [...prevItems, COMP]);
    // }
    // let ATO = await getStock("ATO"); // cycle trading
    // if (ATO != null) {
    //   ATO.TimeToBuy = ATO.CurrentPrice < 171 && ATO.Change >= 0;
    //   setstocks_6_1_26((prevItems) => [...prevItems, ATO]);
    // }
    // stock = await getStock("ATO");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.CurrentPrice < 171 && stock.Change >= 0;
    //   stocks.push(stock);
    // }
    // stock = await getStock("OKLO");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0;
    //   stocks.push(stock);
    // }
    // stock = await getStock("TPL");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice > 921.8;
    //   stocks.push(stock);
    // }
    // stock = await getStock("ROK");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 382;
    //   stocks.push(stock);
    // }
    // stock = await getStock("NVDA");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 184.85;
    //   stocks.push(stock);
    // }
    // stock = await getStock("AAPL");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 268;
    //   stocks.push(stock);
    // }
    // stock = await getStock("ORCL");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0;
    //   stocks.push(stock);
    // }
    // stock = await getStock("AGI");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0;
    //   stocks.push(stock);
    // }
    // stock = await getStock("INTR");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 8.5;
    //   stocks.push(stock);
    // }
    // stock = await getStock("ARKK");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice > 8.5;
    //   stocks.push(stock);
    // }
    // stock = await getStock("FROG");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice > 62;
    //   stocks.push(stock);
    // }
    // stock = await getStock("TEVA");
    // if (stock != null) {
    //   stock.TimeToBuy = stock.Change >= 0 && stock.CurrentPrice < 26;
    //   stocks.push(stock);
    // }
  };

  //const loadStocks9_12_25 = () => {

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
