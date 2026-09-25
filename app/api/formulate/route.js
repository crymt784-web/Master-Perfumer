export async function POST(req) {
  const body = await req.json();
  const message = body.message || "";
  const batchSize = body.batchSize || 50;
  const previous = body.previous || "none";

  const formula =
    "Category: Woody Citrus\n\n" +
    "Concept: A rainy forest with wet wood and a bergamot snap.\n" +
    "Batch: " + batchSize + " ml\n" +
    "Request: " + message + "\n\n" +
    "Variation 1 - Clean and Minimal\n" +
    "Effects: fresh, airy, evening wear\n" +
    "Top: bergamot 10%, black pepper 4%\n" +
    "Heart: cedarwood 18%, violet leaf 8%\n" +
    "Base: vetiver 20%, ambroxan 12%, iso e super 28%\n\n" +
    "Variation 2 - Rich and Complex\n" +
    "Effects: warmer, longer lasting\n" +
    "Top: bergamot 8%, pink pepper 4%\n" +
    "Heart: mahogany 16%, rose 8%, cedar 12%\n" +
    "Base: vetiver 18%, labdanum 10%, ambroxan 14%, vanilla 10%\n\n" +
    "Variation 3 - Green Niche\n" +
    "Effects: damper, greener, less sweet\n" +
    "Top: bergamot 9%, galbanum 5%\n" +
    "Heart: violet leaf 12%, pine 14%, cedar 10%\n" +
    "Base: vetiver 22%, oakmoss 8%, ambroxan 20%\n\n" +
    "Tips: mix base first, then heart, then top. Macerate 2 to 4 weeks.\n" +
    "Previous: " + previous;

  return Response.json({ formula });
}
