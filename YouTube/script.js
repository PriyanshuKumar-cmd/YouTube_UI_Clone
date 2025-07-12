// Set default theme on load
document.body.classList.add("light-mode");
document.querySelector("header").classList.add("light-mode");

const container = document.getElementById("videoContainer");

// Render videos to the page
function renderVideos(videoList) {
  container.innerHTML = "";

  videoList.forEach((video) => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <div class="thumbnail-container">
        <img src="${video.thumbnail}" alt="${video.title}" />
        <span class="duration">${video.duration}</span>
      </div>
      <div class="video-info">
        <div class="video-title">${video.title}</div>
        <div class="channel-name">${video.channel}</div>
      </div>
    `;
    container.appendChild(card);
  });
}


// Load videos from local JSON file
fetch("data/videos.json")
  .then(res => res.json())
  .then(videos => {
    renderVideos(videos);

    // Search filter
    document.getElementById("searchInput").addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm)
      );
      renderVideos(filtered);
    });
  })
  .catch(err => console.error("Error loading video data:", err));
// Dark Mode Toggle
const themeToggleBtn = document.getElementById("themeToggle");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  const header = document.querySelector("header");
  const videoCards = document.querySelectorAll(".video-card");

  header.classList.toggle("dark-mode");
  header.classList.toggle("light-mode");

  videoCards.forEach(card => {
    card.classList.toggle("dark-mode");
  });

  // Update button text
  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "☀️ Light Mode";
  } else {
    themeToggleBtn.textContent = "🌙 Dark Mode";
  }
});
