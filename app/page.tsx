"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>(null);

  async function loadData() {
    const res = await fetch("/api/eth", { cache: "no-store" });
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #111827, #020617)",
      color: "white",
      fontFamily: "Arial",
      padding: "24px"
    }}>
      <h1>Forlani Bank — ETH Impulse Engine</h1>

      {!data && <p>Loading real ETH data...</p>}

      {data && (
        <section style={{
          marginTop: "24px",
          padding: "22px",
          border: "1px solid #2dd4bf",
          borderRadius: "20px",
          background: "#0f172a",
          boxShadow: "0 0 30px rgba(45, 212, 191, 0.25)"
        }}>
          <h2>ETHUSDT Live Radar</h2>

          <h3 style={{ fontSize: "34px" }}>${data.price}</h3>

          <p>24h Change: {data.change24h}%</p>
          <p>Direction: <b>{data.direction}</b></p>
          <p>Impulse Power: <b>{data.impulsePower}/100</b></p>
          <p>Class: <b>{data.impulseClass}</b></p>
          <p>Bull Score: {data.bullScore}</p>
          <p>Bear Score: {data.bearScore}</p>
          <p>Updated: {data.updated}</p>
        </section>
      )}
    </main>
  );
}