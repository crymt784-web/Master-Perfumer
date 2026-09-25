      
"use client";

import { useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [batchSize, setBatchSize] = useState(50);
  const [formula, setFormula] = useState("");
  const [adjustment, setAdjustment] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(message) {
    setLoading(true);
    const res = await fetch("/api/formulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, batchSize, previous: formula })
    });
    const data = await res.json();
    setFormula(data.formula || data.error || "No formula returned");
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>The Master Perfumer</h1>
      <p>Describe a mood, place, or scent.</p>

      <p>Batch size:</p>
      {[30, 50, 100].map((size) => (
        <button key={size} onClick={() => setBatchSize(size)} style={{ marginRight: 8 }}>
          {size} ml
        </button>
      ))}
      <p>Selected: {batchSize} ml</p>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="a rainy evening in a mahogany forest with a sharp bergamot snap"
        style={{ width: "100%", height: 90 }}
      />
      <br />
      <button disabled={loading} onClick={() => send(description)}>
        {loading ? "Formulating..." : "Create Formula"}
      </button>

      {formula && (
        <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: 12 }}>
          {formula}
        </pre>
      )}

      {formula && (
        <div>
          <p>Adjust the formula:</p>
          <input
            value={adjustment}
            onChange={(e) => setAdjustment(e.target.value)}
            placeholder="make it greener, less amber"
            style={{ width: "100%" }}
          />
          <button disabled={loading} onClick={() => send(adjustment)}>
            Adjust
          </button>
        </div>
      )}
    </main>
  );
}
