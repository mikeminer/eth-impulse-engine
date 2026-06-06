export async function GET() {
  const res = await fetch(
    "https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT",
    { cache: "no-store" }
  );

  const data = await res.json();

  const price = Number(data.lastPrice);
  const change24h = Number(data.priceChangePercent);

  const absChange = Math.abs(change24h);

  let impulsePower = Math.min(100, Math.round(absChange * 12));

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

  const bullScore = change24h > 0 ? impulsePower : Math.max(0, 20 - impulsePower);
  const bearScore = change24h < 0 ? impulsePower : Math.max(0, 20 - impulsePower);

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
}
