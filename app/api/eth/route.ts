export async function GET() {
  try {
    const res = await fetch(
      "https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT",
      { cache: "no-store" }
    );

    const data = await res.json();

    if (!res.ok || !data.lastPrice || !data.priceChangePercent) {
      return Response.json({
        error: true,
        message: "Binance response invalid",
        raw: data,
        price: "API ERROR",
        change24h: "API ERROR",
        direction: "NEUTRAL",
        impulsePower: 0,
        impulseClass: "NO DATA",
        bullScore: 0,
        bearScore: 0,
        updated: new Date().toLocaleString("it-IT")
      });
    }

    const price = Number(data.lastPrice);
    const change24h = Number(data.priceChangePercent);
    const absChange = Math.abs(change24h);

    const impulsePower = Math.min(100, Math.round(absChange * 12));

    let impulseClass = "NO IMPULSE";
    if (impulsePower >= 90) impulseClass = "EXTREME / BLOW-OFF";
    else if (impulsePower >= 75) impulseClass = "VIOLENT IMPULSE";
    else if (impulsePower >= 60) impulseClass = "STRONG IMPULSE";
    else if (impulsePower >= 35) impulseClass = "MODERATE IMPULSE";
    else if (impulsePower >= 15) impulseClass = "WEAK IMPULSE";

    const direction =
      change24h > 0 ? "LONG" :
      change24h < 0 ? "SHORT" :
      "NEUTRAL";

    const bullScore = change24h > 0 ? impulsePower : 0;
    const bearScore = change24h < 0 ? impulsePower : 0;

    return Response.json({
      symbol: "ETHUSDT",
      price: price.toFixed(2),
      change24h: change24h.toFixed(2),
      direction,
      impulsePower,
      impulseClass,
      bullScore,
      bearScore,
      updated: new Date().toLocaleString("it-IT")
    });

  } catch (error: any) {
    return Response.json({
      error: true,
      message: error.message,
      price: "FETCH ERROR",
      change24h: "FETCH ERROR",
      direction: "NEUTRAL",
      impulsePower: 0,
      impulseClass: "NO DATA",
      bullScore: 0,
      bearScore: 0,
      updated: new Date().toLocaleString("it-IT")
    });
  }
}