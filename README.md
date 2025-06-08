# Chronode

A chromium based extension which aims to remove distractions, promote less scrolling, encourage better use of social media and help you take your time back from YouTube, Twitter, Facebook and the like. 

I encourage anyone to contribute (:
Feel free to send me suggestions or questions via [email](https://johnsony0.github.io/contact), or for bug reports create a GitHub [issue](https://github.com/johnsony0/productivity-extension/issues).

---

## Table of Contents

- [Users](#users)
  - [Installation](#installation)
  - [Examples](#examples)
  - [Features](#features) 
  - [Settings Explained](#settings-explained)
- [Devs](#devs)
  - [Setup and Structure](#setup-and-structure)
  - [Known Problems](#known-problems)
  - [ML/AI Model](#mlai-model)
- [Acknowledgements](#acknowledgements)
---

## Users

### Installation
- Regular
  - Install from the [Chrome Web Store](insertlink) 
  - Configure Settings
- Early Releases
  - Download most recent release on this repo
  - Unzip file
  - On the [Chrome Extensions Page](chrome://extensions/)
  - Turn on developer mode (top right)
  - Click load unpacked (top left)
  - Select the unzipped dist folder
- Most Recent Version
  - Download the repo
  - Follow guide for [setup](#setup-and-structure)
  - pnpm run build for the dist folder
  - Follow steps 2-6 above

### Examples

### Features
- All Settings Customizable
- Quick Select Settings 
- Dark Mode 
- Timeouts
- Hiding Navigation Tools
- Remove Reactions and Comments
- Filter Politically Biased Posts
- Set Posts Viewable Per Day
- Hide Notifications and Messages
- Delete Friends/Video Suggestions
- Remove Shorts/Reels
- Further Modifications like Greyscale and Hiding Images/Videos
- Basic Stats

### Settings Explained
- Quick Settings

---

## Devs

### Setup and Structure

This extension was built using a template managed by [Jonghakseo](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/tree/main), and mostly stays true to their boilerplate in terms of setup and structure. They describe installation, dependencies, environment variables, and more at far greather length than I ever can.

For setup and structure information, please read their [ReadMe](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/tree/main?tab=readme-ov-file#installation). 

My structure varies slightly with changes noted below:

### Known Problems

* If you get an error indicating that Port 8081 is already being used, try the following for Windows: 
```bash
netstat -ano | findstr :8081
TCP    0.0.0.0:8081    0.0.0.0:0    LISTENING    1234
taskkill /PID 1234 /F
```

### ML/AI Model

For contribution and information regarding the AI/ML model, check out our AI/ML [documentation](model_creation/README_ML_AI.md). 

---

## Acknowledgements

Huge thanks to [Jonghakseo](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/tree/main) and the contributors to his repo for their amazing boilerplate!