# Searchemon

**Searchemon** is a simple Pokédex app built with React and powered by the [PokeAPI](https://pokeapi.co/).  
Search for Pokémon by name and view their basic stats, including type, height, weight, and a front sprite.

---

## 🔧 Technologies Used

- **React** – frontend library for building UI
- **Axios** – HTTP client for fetching data
- **JavaScript (ES6+)**
- **CSS** – basic styling
- **PokeAPI** – public Pokémon data API

---

## ⚙️ Features

- 🔍 Search Pokémon by name (case-insensitive)
- 📜 Browse over 1000 Pokémon from PokeAPI
- 🧬 View details for each Pokémon:
  - Front sprite image
  - Name
  - Type(s)
  - Height and weight (converted to meters/kilograms)
- ❌ Handles API errors gracefully

---

## 📁 Project Structure

```
src/
├── App.js                  # Main application logic and state management
├── components/
│   ├── SearchBar.js        # Search input and buttons
│   └── PokemonDetails.js   # Shows detailed Pokémon info
├── App.css                 # Styles
└── index.js                # React entry point
```

---

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/WiolaWysopal/Searchemon.git
cd searchemon
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the app:**

```bash
npm start
```

Then go to `http://localhost:3000` in your browser.

---

## 🌐 Data Source

All Pokémon data is provided by [PokeAPI](https://pokeapi.co/), a free and open Pokémon RESTful API.

<!-- --- -->

<!-- ## 📸 Screenshots *(optional)* -->

<!-- Add screenshots here if needed -->

## 📄 License

This is a learning project. Free to use and modify 🎓
