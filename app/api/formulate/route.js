export async function POST(req) {
  const body = await req.json();
  const message = body.message || "";
  const batchSize = Number(body.batchSize || 50);
  const previous = body.previous || "none";
  const dropsPerMl = 20;
  const concentratePct = 0.2;
  const concentrateMl = batchSize * concentratePct;
  const totalDrops = Math.round(concentrateMl * dropsPerMl);

  function amount(pct) {
    const ml = (concentrateMl * pct) / 100;
    const drops = Math.round(ml * dropsPerMl);
    return ml.toFixed(2) + " ml / " + drops + " drops";
  }

  const formula =
    "Category: Woody Citrus\n" +
    "Concept: A rainy forest with wet wood and a bergamot snap.\n" +
    "Request: " + message + "\n" +
    "Finished bottle: " + batchSize + " ml\n" +
    "Concentrate: 20% = " + concentrateMl.toFixed(2) + " ml\n" +
    "Drop rule: 1 ml = about 20 drops\n" +
    "Total concentrate drops: " + totalDrops + "\n\n" +
    "Variation 1 - Clean and Minimal\n" +
    "Effects: fresh, airy, evening wear\n" +
    "Bergamot 10%: " + amount(10) + "\n" +
    "Black pepper 4%: " + amount(4) + "\n" +
    "Cedarwood 18%: " + amount(18) + "\n" +
    "Violet leaf 8%: " + amount(8) + "\n" +
    "Vetiver 20%: " + amount(20) + "\n" +
    "Ambroxan 12%: " + amount(12) + "\n" +
    "Iso E Super 28%: " + amount(28) + "\n" +
    "Perfumer alcohol: " + (batchSize - concentrateMl).toFixed(2) + " ml\n\n" +
    "Variation 2 - Rich and Complex\n" +
    "Effects: warmer, longer lasting\n" +
    "Bergamot 8%: " + amount(8) + "\n" +
    "Pink pepper 4%: " + amount(4) + "\n" +
    "Mahogany 16%: " + amount(16) + "\n" +
    "Rose 8%: " + amount(8) + "\n" +
    "Cedar 12%: " + amount(12) + "\n" +
    "Vetiver 18%: " + amount(18) + "\n" +
    "Labdanum 10%: " + amount(10) + "\n" +
    "Ambroxan 14%: " + amount(14) + "\n" +
    "Vanilla 10%: " + amount(10) + "\n\n" +
    "Variation 3 - Green Niche\n" +
    "Effects: damper, greener, less sweet\n" +
    "Bergamot 9%: " + amount(9) + "\n" +
    "Galbanum 5%: " + amount(5) + "\n" +
    "Violet leaf 12%: " + amount(12) + "\n" +
    "Pine 14%: " + amount(14) + "\n" +
    "Cedar 10%: " + amount(10) + "\n" +
    "Vetiver 22%: " + amount(22) + "\n" +
    "Oakmoss 8%: " + amount(8) + "\n" +
    "Ambroxan 20%: " + amount(20) + "\n\n" +
    "Tips: weigh if you can. Drops are estimates. Mix base first, then heart, then top. Macerate 2 to 4 weeks.\n" +
    "Previous: " + previous;

  return Response.json({ formula });
}
