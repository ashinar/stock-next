"use client";
import { useRef } from "react";
import Stocks from "@/components/stcoks/stocks";
import { getStock, StockData } from "@/lib/finnhub";
import { useState, useEffect } from "react";

export default function CyclesTrading() {
  const didRun = useRef(false);
  const [taStocks, setTaStocks] = useState<StockData[]>([]);

  useEffect(() => {
    if (!didRun.current) {
      didRun.current = true;
      loadTAStocks();
    }
  }, []);

  const loadTAStocks = async (): Promise<void> => {
    let NXSN = await getStock("NXSN"); //NEXT VISION
    if (NXSN != null) {
      if (NXSN.CurrentPrice == 0) {
        NXSN.CurrentPrice = 0;
        NXSN.Percent = 0;
        NXSN.TimeToBuy = true;
      }
      //NXSN.TimeToBuy = NXSN.Change > 0 && NXSN.CurrentPrice > 24900;
      setTaStocks((prevItems) => [...prevItems, NXSN]);
    }

    let TSEM = await getStock("TSEM");
    if (TSEM != null) {
      TSEM.TimeToBuy = TSEM.Change > 0 && TSEM.CurrentPrice > 128;
      setTaStocks((prevItems) => [...prevItems, TSEM]);
    }

    // let MVNE = await getStock("MVNE");
    // if (MVNE != null) {
    //   MVNE.TimeToBuy = MVNE.CurrentPrice < 112 || MVNE.CurrentPrice > 128;
    //   setTaStocks((prevItems) => [...prevItems, MVNE]);
    // }

    let HARL = await getStock("HARL");
    if (HARL != null) {
      HARL.TimeToBuy = HARL.Change > 0 && HARL.CurrentPrice > 12990;
      setTaStocks((prevItems) => [...prevItems, HARL]);
    }

    let PHOE = await getStock("PHOE");
    if (PHOE != null) {
      PHOE.TimeToBuy = PHOE.Change > 0 && PHOE.CurrentPrice > 14000;
      setTaStocks((prevItems) => [...prevItems, PHOE]);
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
            בורסת ת"א
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
            TA
          </span>
        </div>
      </div>
      {taStocks && taStocks.map((s) => <Stocks key={s.Symbol} stock={s} />)}
    </div>
  );
}
