"use client";
type StockIdea = {
  ticker: string;
  reason: string;
  score?: number;
};

const stockIdeas: StockIdea[] = [
  {
    ticker: "NVDA",
    reason: "Strong uptrend and consolidation near highs",
    score: 95,
  },
  {
    ticker: "AAPL",
    reason: "Potential breakout from resistance",
    score: 88,
  },
  {
    ticker: "MSFT",
    reason: "Pullback to support in long-term uptrend",
    score: 92,
  },
];

export default function StockIdea() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "3rem",
          color: "#333",
          letterSpacing: "1px",
        }}
      >
        Stocks to Watch
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {stockIdeas.map((stock) => (
          <div
            key={stock.ticker}
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-5px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 12px 30px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "none";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h2 style={{ margin: 0, color: "#0d3b66" }}>{stock.ticker}</h2>
              {stock.score && (
                <span
                  style={{
                    background: "#ffb400",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {stock.score}%
                </span>
              )}
            </div>
            <p style={{ color: "#555", lineHeight: "1.6" }}>{stock.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
