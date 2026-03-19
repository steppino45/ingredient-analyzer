console.log("Welcome, Ifeanyi. This is Project 3: Ingredients Analyzer!");

// ************* CHUNK 1 *****************************
// DATABASE
let ingredientsDB = [];

// HEADER
const dbCount = document.getElementById("dbCount");
const lastUpdated = document.getElementById("lastUpdated");

// INPUT
const ingInput = document.getElementById("ingInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const resetBtn = document.getElementById("resetBtn");

// RESULTS HIGHLIGHT SECTION
const resultsHighlight = document.getElementById("resultsHighlight");
const breakdownCount = document.getElementById("breakdownCount");
const ingredientDisplay = document.getElementById("ingredientDisplay");

// RESULTS CARDS SECTION
const resultsCards = document.getElementById("resultsCards");
const goodCards = document.getElementById("goodCards");
const badCards = document.getElementById("badCards");
const neutralCards = document.getElementById("neutralCards");
const unknownCards = document.getElementById("unknownCards");

// ************* CHUNK 2 ******************************
// FETCH JSON ON PAGE LOAD
async function loadDatabase() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/steppino45/ingredients-db/refs/heads/main/ingredients.json",
    );
    const data = await response.json();

    // POPULATE DATABASE
    ingredientsDB = data.ingredients;

    // POPULATE HEADER METADATA
    dbCount.textContent = `${ingredientsDB.length} ingredients`;
    lastUpdated.textContent = `${data.last_updated}`;
  } catch (error) {
    console.error("Failed to load ingredients database:", error);
    dbCount.textContent = "Database unavailable";
  }
}

// CALL ON PAGE LOAD
loadDatabase();

// ************* CHUNK 3 ***********************
// PARSE INPUT
function parseInput() {
  return ingInput.value
    .split(",")
    .map((ingredient) => ingredient.trim().toLowerCase())
    .filter((ingredient) => ingredient !== "");
}

// ************ CHUNK 4 *************************
// MATCH INGREDIENT
function matchIngredient(ingredient) {
  return ingredientsDB.find(
    (entry) =>
      entry.name.toLowerCase() === ingredient ||
      entry.aliases.some((alias) => alias.toLowerCase() === ingredient),
  );
}

// ***************** CHUNK 5 *****************
// RENDER HIGHLIGHT
function renderHighlight(parsedIngredients) {
  ingredientDisplay.innerHTML = "";

  parsedIngredients.forEach((ingredient) => {
    const match = matchIngredient(ingredient);
    const tag = document.createElement("span");

    tag.classList.add("ingredient-tag");

    if (match) {
      tag.classList.add(match.category);
      tag.textContent = match.name;
    } else {
      tag.classList.add("unknown");
      tag.textContent = ingredient;
    }

    ingredientDisplay.appendChild(tag);
  });
}

// *************** CHUNK 6 ******************
// RENDER CARDS
function renderCards(parsedIngredients) {
  // CLEAR PREVIOUS RESULTS
  goodCards.querySelector(".cards-grid").innerHTML = "";
  badCards.querySelector(".cards-grid").innerHTML = "";
  neutralCards.querySelector(".cards-grid").innerHTML = "";
  unknownCards.querySelector(".cards-grid").innerHTML = "";

  parsedIngredients.forEach((ingredient) => {
    const match = matchIngredient(ingredient);
    const card = document.createElement("div");
    card.classList.add("ingredient-card");

    if (match) {
      card.classList.add(match.category);
      card.innerHTML = `
      <p class="card-name">${match.name}</p>
      <p class="card-comedogenic">Comedogenic Rating: ${match.comedogenic_rating}/5</p>
      <p class="card-reason">${match.reason}</p>
      <button class="card-toggle">More info</button>
      <p class="card-notes">${match.notes}</p>
      `;

      // TOGGLE NOTES
      const toggle = card.querySelector(".card-toggle");
      const notes = card.querySelector(".card-notes");

      toggle.addEventListener("click", () => {
        const isVisible = notes.style.display === "block";
        notes.style.display = isVisible ? "none" : "block";
        toggle.textContent = isVisible ? "More info" : "Less info";
      });

      // APPEND TO CORRECT CATEGORY SECTION
      if (match.category === "good") {
        goodCards.querySelector(".cards-grid").appendChild(card);
      } else if (match.category === "bad") {
        badCards.querySelector(".cards-grid").appendChild(card);
      } else if (match.category === "neutral") {
        neutralCards.querySelector(".cards-grid").appendChild(card);
      }
    } else {
      card.classList.add("unknown");
      card.innerHTML = `
      <p class="card-name">${ingredient}</p>
      <p class="card-reason">This ingredient is not currently in our database.</p>
      `;
      unknownCards.querySelector(".cards-grid").appendChild(card);
    }
  });
}

// ************** CHUNK 7 *********************
// UPDATE BREAKDOWN
function updateBreakdown(parsedIngredients) {
  // COUNT EACH CATEGORY
  let good = 0;
  let bad = 0;
  let neutral = 0;
  let unknown = 0;

  parsedIngredients.forEach((ingredient) => {
    const match = matchIngredient(ingredient);
    if (match) {
      if (match.category === "good") good++;
      else if (match.category === "bad") bad++;
      else if (match.category === "neutral") neutral++;
    } else {
      unknown++;
    }
  });

  // TOTAL ANALYZED
  const total = parsedIngredients.length;

  // RENDER BREAKDOWN
  breakdownCount.innerHTML = `
  <p class="breakdown-total">${total} ingredients analyzed</p>
  <span class="breakdown-item good">✅ Good: ${good}</span>
  <span class="breakdown-item bad">🚨 Concerning : ${bad}</span>
  <span class="breakdown-item neutral">➖ Neutral : ${neutral}</span>
  <span class="breakdown-item unknown">❓ Unknown : ${unknown}</span>
  `;
}

// ************** CHUNK 8 *************
// ANALYZE BUTTON
analyzeBtn.addEventListener("click", () => {
  // GUARD CLAUSE - empty textarea
  if (ingInput.value.trim() === "") {
    alert("Please paste your ingredients first.");
    return;
  }

  // PARSE INPUT
  const parsedIngredients = parseInput();

  // RUN ALL HELPERS
  updateBreakdown(parsedIngredients);
  renderHighlight(parsedIngredients);
  renderCards(parsedIngredients);

  // SHOW RESULTS SECTIONS
  resultsHighlight.style.display = "block";
  resultsCards.style.display = "flex";

  // SCROLL TO RESULTS
  resultsHighlight.scrollIntoView({ behavior: "smooth" });
});

// ************* CHUNK 9 *****************
// RESET BUTTON
resetBtn.addEventListener("click", () => {
  // CLEAR TEXTAREA
  ingInput.value = "";

  // HIDE RESULTS SECTION
  resultsHighlight.style.display = "none";
  resultsCards.style.display = "none";

  // CLEAR RESULTS CONTENT
  ingredientDisplay.innerHTML = "";
  breakdownCount.innerHTML = "";
  goodCards.querySelector(".cards-grid").innerHTML = "";
  badCards.querySelector(".cards-grid").innerHTML = "";
  neutralCards.querySelector(".cards-grid").innerHTML = "";
  unknownCards.querySelector(".cards-grid").innerHTML = "";

  // SCROLL BACK TO TOP
  window.scrollTo({ top: 0, behavior: "smooth" });
});
