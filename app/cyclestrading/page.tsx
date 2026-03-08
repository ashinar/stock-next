"use client";
import Stocks from "@/components/stcoks/stocks";
import { getStock, StockData } from "@/lib/finnhub";
import { useState, useEffect, useRef } from "react";

export default function CyclesTrading() {
  const didRun = useRef(false);

  const [stocks_3_26, setStocks_3_26] = useState<StockData[]>([]);
  useEffect(() => {
    if (!didRun.current) {
      didRun.current = true;
      loadstocks_3_26();
    }
  }, []);

  const loadstocks_3_26 = async (): Promise<void> => {
    CheckStocks("SOFI", true, 19.5, setStocks_3_26);
    CheckStocks("SOXX", true, 334, setStocks_3_26);
    CheckStocks("LRCX", false, 57, setStocks_3_26);
    CheckStocks("AMZN", true, 223, setStocks_3_26);
    CheckStocks("LMND", true, 47, setStocks_3_26);
    CheckStocks("RKLB", false, 63, setStocks_3_26);
    CheckStocks("NFLX", true, 100, setStocks_3_26);

    CheckStocksUpAndDown("PLTR", 161, 130, setStocks_3_26);

    CheckStocks("PNC", true, 216, setStocks_3_26);
    CheckStocks("GOOGL", false, 269, setStocks_3_26);
    CheckStocks("WDC", false, 200, setStocks_3_26);
    CheckStocks("AMD", true, 187, setStocks_3_26);
    CheckStocks("HON", true, 228, setStocks_3_26);
    CheckStocks("MP", true, 66, setStocks_3_26);

    CheckStocksUpAndDown("UUUU", 27, 12, setStocks_3_26);

    CheckStocks("OPEN", true, 5.21, setStocks_3_26);
    CheckStocks("SEDG", true, 28, setStocks_3_26);
    CheckStocks("OKLO", true, 58, setStocks_3_26);

    CheckStocks("MSFT", true, 381, setStocks_3_26);
    CheckStocks("AMAT", false, 287, setStocks_3_26);
    CheckStocks("ANET", false, 115, setStocks_3_26);

    CheckStocksUpAndDown("AAOI", 103, 76, setStocks_3_26);

    /*let HOOD = await getStock("HOOD"); //Dark pool
    if (HOOD != null) {
      HOOD.TimeToBuy = HOOD.IsUp && HOOD.CurrentPrice < 78;
      setStocks_6_1_26((prevItems) => [...prevItems, HOOD]);
    }

    let ARM = await getStock("ARM"); //Dark pool
    if (ARM != null) {
      ARM.TimeToBuy = ARM.IsUp && ARM.CurrentPrice < 123;
      setStocks_6_1_26((prevItems) => [...prevItems, ARM]);
    }

    let RR = await getStock("RR"); //Dark pool
    if (RR != null) {
      RR.TimeToBuy = RR.IsUp && RR.CurrentPrice < 3.42;
      setStocks_6_1_26((prevItems) => [...prevItems, RR]);
    }

    let USAR = await getStock("USAR"); //Dark pool
    if (USAR != null) {
      USAR.TimeToBuy = USAR.IsUp && USAR.CurrentPrice < 21;
      setStocks_6_1_26((prevItems) => [...prevItems, USAR]);
    }

    let APLD = await getStock("APLD"); //Dark pool
    if (APLD != null) {
      APLD.TimeToBuy = APLD.IsUp && APLD.CurrentPrice < 32.1;
      setStocks_6_1_26((prevItems) => [...prevItems, APLD]);
    }

    let NBIS = await getStock("NBIS"); //Dark pool
    if (NBIS != null) {
      NBIS.TimeToBuy = NBIS.IsUp && NBIS.CurrentPrice < 73.77;
      setStocks_6_1_26((prevItems) => [...prevItems, NBIS]);
    }

    //8.2.26
    CheckStocks("AAPL", true, 278); //Dark pool
    //7.2.26
    CheckStocks("POR", true, 51.58); //Amir

    //7.2.26
    CheckStocks("NKE", true, 63.92); //trendspider

    //4.2.26
    CheckStocks("RKLB", true, 80.3); //*cycle trading*
    //4.2.26
    CheckStocks("RDDT", true, 164); //*cycle trading*

    CheckStocks("FRPT", true, 72); //Amir
    CheckStocks("USAR", true, 27.29); //Dark pool




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


    let RGTI = await getStock("RGTI"); // cycle trading
    if (RGTI != null) {
      RGTI.TimeToBuy = RGTI.IsUp && RGTI.CurrentPrice > 22;
      setStocks_6_1_26((prevItems) =>
        RGTI.TimeToBuy ? [RGTI, ...prevItems] : [...prevItems, RGTI],
      );
    }

    let RYAAY = await getStock("RYAAY"); //*cycle trading*
    if (RYAAY != null) {
      RYAAY.TimeToBuy = RYAAY.IsUp && RYAAY.CurrentPrice > 71.7;
      setStocks_6_1_26((prevItems) =>
        RYAAY.TimeToBuy ? [RYAAY, ...prevItems] : [...prevItems, RYAAY],
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
    }*/
  };

  const CheckStocksUpAndDown = async (
    symbol: string,
    upPrice: number,
    downPrice: number,
    setStock: React.Dispatch<React.SetStateAction<StockData[]>>,
  ) => {
    let stock = await getStock(symbol);
    if (stock != null) {
      if (
        (stock.IsUp && stock.CurrentPrice >= upPrice) ||
        (!stock.IsUp && stock.CurrentPrice < downPrice)
      ) {
        stock.TimeToBuy = true;
        setStock((prevItems) => [stock, ...prevItems]);
      } else {
        setStock((prevItems) => [...prevItems, stock]);
      }
    }
  };

  const CheckStocks = async (
    symbol: string,
    IsUp: boolean,
    price: number,
    setStock: React.Dispatch<React.SetStateAction<StockData[]>>,
  ) => {
    let stock = await getStock(symbol);
    if (stock != null) {
      if (
        (stock.IsUp && IsUp && stock.CurrentPrice >= price) ||
        (!stock.IsUp && !IsUp && stock.CurrentPrice < price)
      ) {
        stock.TimeToBuy = true;
        setStock((prevItems) => [stock, ...prevItems]);
      } else {
        setStock((prevItems) => [...prevItems, stock]);
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
            March 2026
          </span>
        </div>
      </div>
      {stocks_3_26.map((s) => (
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
