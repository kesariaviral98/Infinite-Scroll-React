# Infinite Scroll Demo

A small React + Vite project that demonstrates infinite scrolling with a modern, browser-friendly approach using `IntersectionObserver`.

## Features

- Loads items in batches as you reach the end of the list
- Uses a sentinel element instead of a noisy global scroll listener
- Shows loading and completion states
- Responsive card-based layout
- Ready to publish to GitHub

## Tech Stack

- React 19
- Vite 7
- ESLint

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Lint the project

```bash
npm run lint
```

### 5. Preview the production build

```bash
npm run preview
```

## Project Structure

```text
src/
  App.jsx
  index.css
  main.jsx
index.html
package.json
```

## Improvements Made

- Replaced the basic scroll-event implementation with `IntersectionObserver`
- Added a loading indicator and a clear end-of-list state
- Improved the layout and visual styling
- Removed Vite starter README content and replaced it with project-specific documentation
- Added a `.gitignore` so local dependencies and build artifacts are not committed

## Push To GitHub

If you have not initialized Git yet:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

## Notes

The repository currently contains `node_modules` locally, but `.gitignore` now excludes it so it will not be added in future commits.

The demo keeps the scroll behavior inside React state and browser APIs, so there is no backend setup required.
