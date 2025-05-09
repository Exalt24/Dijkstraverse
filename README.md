# Pathfinding Visualizer

<div align="center">
  
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://www.ecma-international.org/ecma-262/6.0/)
[![HTML5](https://img.shields.io/badge/HTML-5-orange.svg)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS-3-blue.svg)](https://www.w3.org/Style/CSS/)
[![GitHub](https://img.shields.io/badge/GitHub-Exalt24-lightgrey.svg)](https://github.com/Exalt24/PathfindingVisualizer)
  
</div>

A lightweight, high-performance web application built with vanilla JavaScript that visualizes Dijkstra's pathfinding algorithm on a customizable grid. This interactive tool allows users to create obstacles, place start/end points, adjust traversal costs, and observe the algorithm's exploration and path-finding processes in real-time.

![Pathfinding Visualizer Demo](docs/demo.gif)

## 📋 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Usage Guide](#️-usage-guide)
  - [Grid Interactions](#grid-interactions)
  - [Visualization Controls](#visualization-controls)
  - [Advanced Features](#advanced-features)
  - [State Management](#state-management)
- [Project Architecture](#-project-architecture)
- [Algorithm Implementation](#-algorithm-implementation)
- [Customization Options](#-customization-options)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

- **Interactive Grid System**
  - Flexible dimensions from 10×10 (default) up to 50×50
  - Intuitive wall creation with left-click
  - Drag-and-drop functionality for start/end points

- **Advanced Pathfinding**
  - Optimized Dijkstra's algorithm implementation (O(N log N) via min-heap)
  - Smooth, animated visualization of exploration process
  - Real-time path discovery highlighting

- **Powerful Customization**
  - Dynamic grid resizing without page reload
  - Adjustable visualization speed via intuitive slider
  - Weighted nodes system (1-9 scale) with visual indicators

- **Procedural Generation**
  - One-click perfect maze generation
  - Random weight distribution option
  - Guaranteed start-to-end reachability

- **State Persistence**
  - Local storage integration for saving grid configurations
  - Complete state restoration (walls, weights, markers)
  - One-click reset functionality

## 🌐 Live Demo

Experience the pathfinding visualizer in action: [Live Demo](#) *(Coming soon)*

## 🛠 Getting Started

### Prerequisites

- Modern web browser with ES6 support (Chrome, Firefox, Safari, Edge)
- Basic HTTP server for local development (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Exalt24/PathfindingVisualizer.git
   cd pathfinding-visualizer
   ```

2. **Serve the project files**

   Using Python's built-in HTTP server:
   ```bash
   python -m http.server 8000
   ```

   Or with Node.js:
   ```bash
   npx serve
   ```

3. **Access the application**

   Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Running Locally

No build process or compilation required! The application uses native ES modules (`type="module"`) for clean code organization.

**Quick Start - Direct HTML Opening**

You can also simply open the HTML file directly in your browser:

1. Download the repository (clone or download ZIP)
2. Extract files if necessary
3. Double-click on `index.html` to open in your default browser

> **Note:** Opening directly may limit some features if using ES modules due to CORS policies. If you encounter issues, use the HTTP server method above.

## ⚙️ Usage Guide

### Grid Interactions

- **Left-click**: Toggle walls (impassable obstacles)
- **Right-click**: Cycle through weight values (1-9)
- **Drag**: Reposition start (green) and target (red) markers
- **Find Path**: Execute the algorithm to discover the optimal route

### Visualization Controls

- **Speed Slider**: Adjust animation pacing from detailed (slow) to instant (fast)
- **Grid Size**: Modify dimensions from 5×5 up to 50×50 cells
- **Clear Path**: Remove visualization while preserving obstacles

### Advanced Features

- **Generate Maze** (🌀): Create perfect mazes using recursive backtracking
- **Random Weights** (🎲): Assign varied traversal costs to empty cells
- **Weight System**: Higher values (1-9) represent more difficult terrain

### State Management

- **Save Grid**: Persist current configuration to browser storage
- **Load Grid**: Restore previously saved setup
- **Reset Grid** (🔄): Clear all obstacles and return to initial state

## 📁 Project Architecture

```
pathfinding-visualizer/
├── index.html              # Main application entry point
├── css/
│   └── styles.css          # Styling and animations
├── js/
│   ├── node.js             # Grid cell representation
│   ├── heap.js             # Priority queue implementation
│   ├── grid.js             # Grid management and rendering
│   ├── algorithm.js        # Dijkstra's algorithm implementation
│   ├── maze.js             # Procedural maze generation
│   └── main.js             # Application initialization and UI binding
└── docs/
    └── demo.gif            # Demo animation for documentation
```

## ⚡ Algorithm Implementation

The application implements **Dijkstra's algorithm** with several performance optimizations:

- **Binary Min-Heap**: Efficient priority queue reduces time complexity to O(N log N)
- **State Caching**: Precomputed neighbor relationships minimize redundant calculations
- **Lazy Rendering**: Updates DOM efficiently with batched operations
- **Dynamic Timing**: Adaptive animation speed via real-time `getDelay()` callbacks

## 🔧 Customization Options

Extend the visualizer with these potential modifications:

- **Alternative Algorithms**: Implement A* by adding a distance heuristic
- **Visual Themes**: Customize the appearance via CSS variables
- **Movement Patterns**: Add support for diagonal movement
- **Multi-Target Pathfinding**: Extend to support multiple destinations
- **Export/Import**: Add functionality to save/load configurations as files

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Exalt24">Exalt24</a></p>
  <p>Star ⭐ this repository if you found it useful!</p>
</div>