# Dijkstraverse

<div align="center">
  
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://www.ecma-international.org/ecma-262/6.0/)
[![HTML5](https://img.shields.io/badge/HTML-5-orange.svg)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS-3-blue.svg)](https://www.w3.org/Style/CSS/)
[![GitHub](https://img.shields.io/badge/GitHub-Exalt24-lightgrey.svg)](https://github.com/Exalt24/Dijkstraverse)

</div>

<p align="center">An interactive pathfinding algorithm visualizer built with vanilla JavaScript. Explore how Dijkstra's algorithm searches for the shortest path on a customizable grid with obstacles, weighted nodes, and procedurally generated mazes.</p>

<div align="center">
  <img src="docs/demo.gif" alt="Dijkstraverse Demo" width="700" />
</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Usage Guide](#️-usage-guide)
- [Project Architecture](#-project-architecture)
- [Algorithm Implementation](#-algorithm-implementation)
- [Customization Options](#-customization-options)
- [Contributing](#-contributing)
- [License](#-license)

## 🔍 Overview

Dijkstraverse is a lightweight, high-performance web application that visualizes Dijkstra's pathfinding algorithm on an interactive grid. The application demonstrates how the algorithm explores nodes, evaluates distances, and ultimately discovers the shortest path between two points, even when navigating through obstacles and areas with varying traversal costs.

Built entirely with vanilla JavaScript, HTML5, and CSS3, Dijkstraverse offers an educational and engaging way to understand graph search algorithms without any framework dependencies.

## ✨ Features

### Interactive Grid System
- **Customizable dimensions** from 10×10 up to 50×50
- **Drag-and-drop functionality** for start and end markers
- **Wall creation and removal** with intuitive click controls
- **Variable node weights** (1-9) to simulate different traversal costs

### Advanced Pathfinding Visualization
- **Optimized Dijkstra's algorithm** implementation using a binary min-heap
- **Real-time animation** showing node exploration sequence
- **Highlighted shortest path** once destination is reached
- **Performance metrics** displaying nodes visited and path length

### Customization Options
- **Dynamic grid resizing** without page reload
- **Adjustable animation speed** from step-by-step to instant
- **Visual indicators** for different node types and states

### Procedural Generation Tools
- **Perfect maze generation** using recursive backtracking
- **Random wall placement** with guaranteed path existence
- **Random weight assignment** for testing weighted pathfinding
- **Random start/end positioning** for varied scenarios

### State Management
- **Local storage integration** for saving grid configurations
- **Configuration restoration** for walls, weights, and markers
- **Quick reset functionality** to default or custom states

## 🌐 Live Demo

Experience the visualizer in action: [Live Demo](https://dijkstraverse.vercel.app)

## 🛠 Getting Started

### Prerequisites
- Modern web browser with ES6 support
- Optional: Simple HTTP server for local development

### Installation

```bash
git clone https://github.com/Exalt24/Dijkstraverse.git
cd Dijkstraverse
```

### Running Locally

#### Option 1: Using Python's HTTP Server

```bash
python -m http.server 8000
```

Then navigate to `http://localhost:8000` in your browser.

#### Option 2: Using Node.js

```bash
npx serve
```

Then navigate to the URL provided in the terminal.

#### Option 3: Direct File Opening

Simply open the `index.html` file in your browser.

> **Note:** If you encounter CORS issues with ES modules when opening the file directly, please use one of the server methods above.

## ⚙️ Usage Guide

### Grid Interactions
- **Left-click** on an empty cell to create or remove a wall
- **Right-click** on a non-wall cell to cycle through weight values (1-9)
- **Click and drag** the start (green) or end (red) markers to reposition them

### Control Panel
- **Find Path**: Initiates the pathfinding algorithm
- **Speed Slider**: Adjusts the visualization speed
- **Grid Size**: Changes the grid dimensions
- **Reset Grid**: Clears all walls, weights, and visualization

### Randomization Tools
- **Generate Maze**: Creates a perfect maze using recursive backtracking
- **Random Walls**: Places walls randomly while ensuring path existence
- **Random Weights**: Assigns random weights to non-wall cells
- **Random Start/End**: Repositions start and end markers randomly

### Persistence
- **Save Grid**: Stores the current configuration in local storage
- **Load Grid**: Restores the previously saved configuration

## 📁 Project Architecture

```
Dijkstraverse/
├── index.html              # Main entry point and HTML structure
├── css/
│   └── styles.css          # Visual styling and animations
├── js/
│   ├── heap.js             # Binary min-heap implementation
│   ├── node.js             # Grid cell representation
│   ├── grid.js             # Grid management and rendering
│   ├── algorithm.js        # Dijkstra's algorithm implementation
│   ├── maze.js             # Procedural maze generation
│   ├── reachable.js        # Path existence verification
│   └── main.js             # Application initialization and UI binding
└── docs/
    └── demo.gif            # Demo animation for documentation
```

## ⚡ Algorithm Implementation

Dijkstraverse implements Dijkstra's algorithm with several optimizations:

- **Binary Min-Heap Priority Queue**: Reduces time complexity to O(N log N)
- **Neighbor Caching**: Precomputes adjacent nodes to avoid repeated boundary checks
- **Asynchronous Animation**: Uses Promise-based delays for smooth visualization
- **Early Termination**: Stops exploration once the target is found
- **Weighted Path Calculation**: Accounts for variable traversal costs

The visualization process:
1. Initialize distances (0 for start, infinity for others)
2. Add unvisited nodes to the priority queue
3. Process the closest unvisited node
4. Update distances to its neighbors
5. Mark the node as visited
6. Repeat until the target is found or no path exists
7. Reconstruct and highlight the shortest path

## 🔧 Customization Options

Dijkstraverse can be extended with the following modifications:

- **Alternative Algorithms**: Implement A* by adding a distance heuristic
- **Additional Movement Patterns**: Enable diagonal movement for 8-directional search
- **Visual Themes**: Customize the appearance through CSS variables
- **Export/Import**: Add functionality to save/load configurations as files
- **Multi-Target Pathfinding**: Extend to support multiple destinations

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Developed by <a href="https://github.com/Exalt24">Exalt24</a></p>
  <p><i>If you found this project helpful, please consider giving it a star ⭐</i></p>
</div>