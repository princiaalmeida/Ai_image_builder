const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");
const FormData = require("form-data");

const app = express();
app.use(cors());
app.use(express.json());

const STABILITY_API_KEY = "";

app.get("/api/images", async (req, res) => {
  const prompt = req.query.q;
  try {
    const form = new FormData();
    form.append("prompt", prompt);
    form.append("model", "stable-diffusion-v1-6"); 
    form.append("steps", 30);                      
    form.append("width", 512);
    form.append("height", 512);
    form.append("output_format", "png");

    const response = await fetch(
      "",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          Accept: "application/json",
          ...form.getHeaders(),
        },
        body: form,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("👉 API Error Response:", errorData);
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ API Success Response:", data);

    if (!data.image) {
      throw new Error("No image returned from API.");
    }

    res.json({ images: [{ src: `data:image/png;base64,${data.image}` }] });
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    res.status(500).json({ error: "Failed to generate image." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
