export async function POST(req) {
  const body = await req.json();
  const message = body.message || "";
  const batchSize = Number(body.batchSize || 50);
  const previous = body.previous || "none";
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return Response.json({ error: "AI key missing" });
  }

  const prompt =
    "You are The Master Perfumer. Use real essential oils and aroma chemicals. " +
    "Give exactly 3 variations. For each include: name, effects, top/heart/base with percentages, " +
    "then exact ml and drop amounts. Assume 20% concentrate in alcohol. 1 ml = 20 drops. " +
    "Finished bottle size: " + batchSize + " ml. " +
    "User request: " + message + ". Previous formula: " + previous + ".";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + key
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();
  const formula =
    data.choices?.[0]?.message?.content ||
    data.error?.message ||
    "Could not generate formula";

  return Response.json({ formula });
}
