export function isReachable(start, end, grid) {
  const visited = new Set();
  const queue = [ start ];
  visited.add(start);

  while (queue.length) {
    const node = queue.shift();
    if (node === end) return true;
    for (const nbr of node.neighbors) {
      if (nbr.isWall || visited.has(nbr)) continue;
      visited.add(nbr);
      queue.push(nbr);
    }
  }
  return false;
}
