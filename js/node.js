export class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isWall = false;
    this.weight = 1;
    this.distance = Infinity;
    this.previous = null;
    this.neighbors = [];
  }
}