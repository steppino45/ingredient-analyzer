<<<<<<< HEAD

# ingredient-analyzer

=======

# Ingredient Analyzer

A clinically-informed cosmetic ingredient analyzer that parses product ingredient lists and categorizes each ingredient as good, concerning, neutral, or unknown — with explanations rooted in dermatological evidence.

Built by **Dr. Ifeanyi R. Chukwuka, MBBS, M.S., MWACP**, Senior Resident in Dermatology.

---

## Live Demo

[View Live App](https://cosmetic-ingredient-analyzer.netlify.app/)

---

## What It Does

1. Paste a product's ingredient list into the text area, separated by commas
2. Click **Analyze**
3. The app cross-references each ingredient against a curated clinical database and returns:
   - An inline color-coded display of every ingredient
   - A breakdown count of good, concerning, neutral and unknown ingredients
   - Expandable cards for each ingredient with comedogenic rating, clinical reason and notes

**Color legend:**
| Color | Meaning |
|-------|---------|
| 🟢 Green | Good — beneficial for skin |
| 🔴 Red | Concerning — irritating, comedogenic or harmful |
| 🔵 Blue-gray | Neutral — functional, no significant benefit or harm |
| 🟣 Lavender | Unknown — not currently in the database |

---

## Tech Stack

- HTML5
- CSS3 — mobile-first, CSS custom properties
- Vanilla JavaScript — async/await, fetch API, DOM manipulation
- No frameworks. No dependencies.

---

## Data Source

Ingredient data is sourced from a separate clinically-curated database:

👉 [ingredients-db](https://github.com/steppino45/ingredients-db)

The database is fetched dynamically on page load via the GitHub raw URL. Updates to the database reflect immediately in the app without any code changes.

---

## Running Locally

No build tools or installations required.

```bash
git clone https://github.com/steppino45/ingredient-analyzer.git
cd ingredient-analyzer
```

Then simply open `index.html` in your browser.

---

## Project Structure

```
ingredient-analyzer/
├── index.html       — app structure and markup
├── styles.css       — mobile-first styling and color scheme
├── script.js        — fetch, parse, match and render logic
└── README.md        — this file
```

---

## Features

- Fetches ingredient database dynamically from GitHub — no hardcoded data
- Alias matching — recognizes alternate INCI names (e.g. "Parfum" matched to "Synthetic Fragrance")
- Expandable cards — notes hidden by default, revealed on toggle
- Fully responsive — designed mobile-first
- Smooth scroll to results after analysis
- Reset clears all results and returns to input

---

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/).

© 2026 Dr. Ifeanyi R. Chukwuka, MBBS. All rights reserved.

---

## Author

**Dr. Ifeanyi R. Chukwuka, MBBS, M.S., MWACP**,
Senior Resident, Dermatology

> Built while waiting for ERAS-SOAP 2026 -- Didn't get matched 😒. Shipped anyway 🥳🎉.
>
> > > > > > > 844cb63 (Initial commit)
