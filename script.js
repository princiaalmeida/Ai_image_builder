const form = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const gallery = document.querySelector(".gallery-grid");
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

themeToggle.addEventListener("click", () => {
  if (html.getAttribute("data-theme") === "light") {
    html.setAttribute("data-theme", "dark");
    document.body.classList.add("dark");
    themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    html.setAttribute("data-theme", "light");
    document.body.classList.remove("dark");
    themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
});


async function fetchAIImage(prompt) {
  const apiUrl = ;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch AI images.");
    const data = await response.json();
    if (!data.images || data.images.length === 0) {
      throw new Error("No images found for this prompt.");
    }

function createImageCard(url) {
  const card = document.createElement("div");
  card.className = "img-card";
  card.innerHTML = `
    <img src="${url}" class="result-img" />
    <div class="img-overlay">
      <button class="img-download-btn">
        <i class="fa-solid fa-download"></i>
      </button>
    </div>
  `;

  card.querySelector(".img-download-btn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-image.png";
    link.click();
  });

  return card;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) {
    alert("Please enter a prompt.");
    return;
  }

  gallery.innerHTML = `<div class="img-card loading">
    <div class="status-container">
      <div class="spinner"></div>
      <p class="status-text">Generating...</p>
    </div>
  </div>`;

  try {
    const imageUrl = await fetchAIImage(prompt);
    const imgCard = createImageCard(imageUrl);
    gallery.innerHTML = "";
    gallery.appendChild(imgCard);
  } catch (err) {
    console.error(err);
    gallery.innerHTML = `<div class="img-card error">
      <div class="status-container">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p class="status-text">Error: ${err.message}</p>
      </div>
    </div>`;
  }
});
