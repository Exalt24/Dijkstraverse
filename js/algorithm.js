import { MinHeap } from './heap.js';

export class Dijkstra {
  static async findPath(grid, start, end, onVisit, onPath, getDelay) {
    grid.reset();

    const heap = new MinHeap();
    start.distance = 0;
    heap.push(start);

    while (true) {
      const current = heap.pop();
      if (!current || current.distance === Infinity) break;

      await onVisit(current);
      if (current === end) break;

      for (const nbr of current.neighbors) {
        if (nbr.isWall) continue;
        const alt = current.distance + nbr.weight;
        if (alt < nbr.distance) {
          nbr.distance = alt;
          nbr.previous = current;
          heap.push(nbr);
        }
      }
      await new Promise(res => setTimeout(res, getDelay()));
    }

    const path = [];
    for (let p = end; p; p = p.previous) path.push(p);
    path.reverse();

    for (const node of path) {
      await onPath(node);
      await new Promise(res => setTimeout(res, getDelay()));
    }
  }
}