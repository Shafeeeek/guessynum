<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=800&size=40&duration=2400&pause=700&color=FFB800&center=true&vCenter=true&width=760&lines=Guess+My+Number;Animated+Expo+Game;Pick.+Guide.+Win." alt="Animated Guess My Number title" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo 54" />
  <img src="https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=111111" alt="React Native 0.81" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Status-Playable-35E58C?style=for-the-badge" alt="Project status playable" />
</p>

<p align="center">
  <b>A colorful mobile number guessing game built with Expo and React Native.</b>
  <br />
  Choose a secret number, guide the opponent with higher/lower hints, and finish with a bright animated game-over screen.
</p>

---

## Preview

<p align="center">
  <img src="./assets/screenshots/welcome.png" width="190" alt="Welcome screen" />
  <img src="./assets/screenshots/start-game.png" width="190" alt="Start game screen" />
  <img src="./assets/screenshots/gameplay.png" width="190" alt="Gameplay screen" />
  <img src="./assets/screenshots/game-over.png" width="190" alt="Game over screen" />
</p>

## Highlights

| Feature | Description |
| --- | --- |
| Animated welcome screen | A splash-style intro with bold copy, gradient button, and motion effects. |
| Number picking flow | The player enters a number between 1 and 99 before the guessing round starts. |
| Higher/lower gameplay | The app guesses and the player guides it with simple controls. |
| Game-over summary | Shows the secret number, total rounds, and a restart action. |
| Custom visual style | Uses gradients, image backgrounds, bright colors, and themed artwork. |

## Tech Stack

| Tool | Purpose |
| --- | --- |
| Expo | Development workflow and native app runtime. |
| React Native | Cross-platform mobile UI. |
| Expo Linear Gradient | Colorful gradient backgrounds and buttons. |
| Expo Splash Screen | Native startup splash handling. |
| Expo Font | Custom font loading. |

## Getting Started

Clone the project and install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Then open the app with Expo Go, an iOS simulator, an Android emulator, or web:

```bash
npm run ios
npm run android
npm run web
```

## Project Structure

```text
.
├── App.js
├── assets
│   ├── fonts
│   ├── images
│   └── screenshots
├── components
│   ├── game
│   └── ui
├── constants
└── screens
    ├── gameoverscreen.js
    ├── gamescreen.js
    ├── startgamescreen.js
    └── welcomescreen.js
```

## Screens

| Screen | Purpose |
| --- | --- |
| `welcomescreen.js` | First animated welcome experience. |
| `startgamescreen.js` | Number input and validation. |
| `gamescreen.js` | Opponent guess and higher/lower controls. |
| `gameoverscreen.js` | Result summary and restart button. |

## Available Scripts

```bash
npm start
npm run ios
npm run android
npm run web
```

## About

Guess My Number is a small, playful Expo project focused on practicing React Native state, reusable UI components, image assets, gradients, splash behavior, and simple animations.
