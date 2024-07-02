document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");
  const resultsContainer = document.getElementById("resultsContainer");

  // Event listener for Search button click
  searchBtn.addEventListener("click", function () {
    const keyword = searchInput.value.toLowerCase();

    // Clear previous results
    resultsContainer.innerHTML = "";
    debugger;
    // Fetch data from the API based on the keyword
    fetch("travel_recommendation_api.json")
      .then((response) => response.json())
      .then((data) => {
        if (
          keyword === "beach" ||
          keyword === "temple" ||
          keyword === "country"
        ) {
          let key;
          switch (keyword) {
            case "beach":
              key = "beaches";
              break;

            case "temple":
              key = "temples";
              break;
            case "country":
              key = "countries";
              break;

            default:
              break;
          }
          displayRecommendations(data[key]);
        } else {
          resultsContainer.innerHTML =
            "<p>No recommendations found for this keyword.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML =
          "<p>Failed to fetch recommendations. Please try again later.</p>";
      });
  });

  // Event listener for Reset button click
  resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
  });

  // Function to display recommendations
  function displayRecommendations(recommendations) {
    debugger;
    recommendations.forEach((recommendation) => {
      const resultElement = document.createElement("div");
      resultElement.classList.add("result");

      const nameElement = document.createElement("h2");
      nameElement.textContent = recommendation.name;

      const imageElement = document.createElement("img");
      imageElement.src = recommendation.imageUrl;
      imageElement.alt = recommendation.name;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = recommendation.description;

      resultElement.appendChild(nameElement);
      resultElement.appendChild(imageElement);
      resultElement.appendChild(descriptionElement);

      resultsContainer.appendChild(resultElement);
    });
  }
});
