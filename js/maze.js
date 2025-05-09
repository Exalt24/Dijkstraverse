export class MazeGenerator {
  static generate(grid, startNode, endNode) {
    const { nodes } = grid;
    nodes.flat().forEach(n => n.isWall = true);

    const stack = [];
    startNode.isWall = false;
    stack.push(startNode);

    while (stack.length) {
      const cell = stack[stack.length - 1];
      const neighbors = [];
      [[2,0],[-2,0],[0,2],[0,-2]].forEach(([dx,dy]) => {
        const nx = cell.x + dx, ny = cell.y + dy;
        const between = grid.getNode(cell.x + dx/2, cell.y + dy/2);
        const ncell   = grid.getNode(nx, ny);
        if (ncell && ncell.isWall) neighbors.push({ ncell, between });
      });
      if (neighbors.length) {
        const { ncell, between } = neighbors[Math.floor(Math.random() * neighbors.length)];
        between.isWall = false;
        ncell.isWall   = false;
        stack.push(ncell);
      } else {
        stack.pop();
      }
    }

    // ensure endNode is open
    endNode.isWall = false;
    // guarantee at least one neighbor is open
    const reachable = endNode.neighbors.some(n => !n.isWall);
    if (!reachable) {
      const choice = endNode.neighbors[Math.floor(Math.random() * endNode.neighbors.length)];
      choice.isWall = false;
    }
  }
}