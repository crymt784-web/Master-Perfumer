export async function POST(req) {
  const body = await req.json();
  const message = body.message || "";
  const batchSize = Number(body.batchSize || 50);
  const previous = body.previous || "none";
  const key = process.env.OPENAI_API_KEY;
  const concentrateMl = batchSize * 0.2;
  const alcoholMl = batchSize - concentrateMl;
  const totalDrops = Math.round(concentrateMl * 20);

  if (!key) {
    return Response.json({ error: "AI key missing" });
  }

  const prompt =
    "You are The Master Perfumer. Do not invent your own bottle math. " +
    "Use this exact math: finished bottle " + batchSize + " ml, concentrate " +
    concentrateMl.toFixed(2) + " ml, alcohol " + alcoholMl.toFixed(2) +
    " ml, 1 ml = 20 drops, total concentrate drops " + totalDrops + ". " +
    "Give 3 variations. Each variation must have materials whose percentages add to 100. " +
    "For every material show percent, ml, and drops using: ml = percent/100*" +
    concentrateMl.toFixed(2) + ", drops = ml*20. " +
    "Use real oils and aroma chemicals. User request: " + message +
    ". Previous: " + previous + ".";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + key
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 900,
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();
  const header =
    "LOCKED MATH\n" +
    "Bottle: " + batchSize + " ml\n" +
    "Concentrate 20%: " + concentrateMl.toFixed(2) + " ml / " + totalDrops + " drops\n" +
    "Alcohol 80%: " + alcoholMl.toFixed(2) + " ml\n\n";
  const formula =
    header +
    (data.choices?.[0]?.message?.content || data.error?.message || "Could not generate formula");

  return Response.json({ formula });
}
