import { Node } from './node.js';

export class Grid {
  constructor(cols = 10, rows = 10) {
    this.cols = cols;
    this.rows = rows;
    this.nodes = [];

    for (let y = 0; y < rows; y++) {
      const row = [];
      for (let x = 0; x < cols; x++) {
        row.push(new Node(x, y));
      }
      this.nodes.push(row);
    }

    this._cacheNeighbors();
  }

  _cacheNeighbors() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const node = this.nodes[y][x];
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy]) => {
          const nx = x + dx, ny = y + dy;
          if (ny >= 0 && ny < this.rows && nx >= 0 && nx < this.cols) {
            node.neighbors.push(this.nodes[ny][nx]);
          }
        });
      }
    }
  }

  getNode(x, y) {
    return this.nodes[y]?.[x] || null;
  }

  reset() {
    this.nodes.flat().forEach(n => {
      n.distance = Infinity;
      n.previous = null;
    });
  }
}