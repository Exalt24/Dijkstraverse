import { Grid }    from './grid.js';
import { Dijkstra } from './algorithm.js';
import { MazeGenerator } from './maze.js';
import { isReachable } from './reachable.js';

const container  = document.getElementById('gridContainer');
const findBtn    = document.getElementById('findPathBtn');
const resetBtn   = document.getElementById('resetBtn');
const randomBtn = document.getElementById('randomBtn');
const randomWeightsBtn = document.getElementById('randWeightsBtn');
const randomWallsBtn = document.getElementById('randomWallsBtn');
const mazeBtn    = document.getElementById('mazeBtn');
const sizeInput  = document.getElementById('gridSizeInput');
const speedInput = document.getElementById('speedControl');
const saveBtn    = document.getElementById('saveBtn');
const loadBtn    = document.getElementById('loadBtn');

let grid  = new Grid(10,10);
let start = grid.getNode(0,0);
let end   = grid.getNode(9,9);
let isFinding = false;

function drawGrid() {
  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${grid.cols}, 1fr)`;
  container.style.gridTemplateRows    = `repeat(${grid.rows}, 1fr)`;
  grid.nodes.flat().forEach(n => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.x = n.x;
    cell.dataset.y = n.y;
    if (n.isWall)     cell.classList.add('wall');
    if (n === start)  cell.classList.add('start');
    if (n === end)    cell.classList.add('end');
    if (n.weight>1)   cell.classList.add(`weight-${n.weight}`);
    if (!n.isWall && n !== start && n !== end) {
        cell.textContent = n.weight;
        cell.style.color = '#000';
        cell.style.fontWeight = 'bold';
    } else {
        cell.textContent = '';
    }
    container.appendChild(cell);
  });
}

drawGrid();

grid.reset = grid.reset.bind(grid);

let dragging = null;
container.addEventListener('mousedown', e => {
  if (!e.target.classList.contains('cell')) return;
  if (e.target.classList.contains('start')) dragging = 'start';
  else if (e.target.classList.contains('end')) dragging = 'end';
});
document.addEventListener('mouseup', e => {
  if (!dragging) return;
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (el?.classList.contains('cell') && !el.classList.contains('wall')) {
    const x = +el.dataset.x, y = +el.dataset.y;
    if (dragging === 'start') start = grid.getNode(x, y);
    else                       end   = grid.getNode(x, y);
    drawGrid();
  }
  dragging = null;
});
container.addEventListener('mouseover', e => {
  const cell = e.target;
  if (dragging && cell.classList.contains('cell') && !cell.classList.contains('wall')) {
    cell.classList.add('drag-over');
  }
});
container.addEventListener('mouseout', e => {
  const cell = e.target;
  if (cell.classList.contains('cell')) {
    cell.classList.remove('drag-over');
  }
});

container.addEventListener('click', e => {
  if (!e.target.classList.contains('cell') || dragging) return;
  const x = +e.target.dataset.x, y = +e.target.dataset.y;
  const n = grid.getNode(x,y);
  if (n !== start && n !== end) { n.isWall = !n.isWall; drawGrid(); }
});
container.addEventListener('contextmenu', e => {
  e.preventDefault();
  if (!e.target.classList.contains('cell')) return;
  const x = +e.target.dataset.x, y = +e.target.dataset.y;
  const n = grid.getNode(x,y);
  if (n === start || n === end) return;
    n.weight = (n.weight % 9) + 1;
  drawGrid();
});

sizeInput.addEventListener('input', () => {
  if (isFinding) return;
  if (sizeInput.value < 10){
    sizeInput.value = 10;
    return;
  } else if (sizeInput.value > 50) {
    sizeInput.value = 50;
    return;
  }
  const sz = +sizeInput.value;
  grid  = new Grid(sz,sz);
  start = grid.getNode(0,0);
  end   = grid.getNode(sz-1,sz-1);
  container.style.gridTemplateColumns = `repeat(${sz}, 1fr)`;
  container.style.gridTemplateRows    = `repeat(${sz}, 1fr)`;
  drawGrid();
});

const minD = +speedInput.min, maxD = +speedInput.max;
let delay;
function updateDelay() { delay = maxD + minD - +speedInput.value; }
speedInput.addEventListener('input', updateDelay);
updateDelay();

mazeBtn.addEventListener('click', () => {
    if (isFinding) return;
    MazeGenerator.generate(grid, start, end);
    drawGrid();
});

resetBtn.addEventListener('click', () => {
  if (isFinding) return;
  const sz = grid.cols;
  grid  = new Grid(sz, sz);
  start = grid.getNode(0, 0);
  end   = grid.getNode(sz - 1, sz - 1);
  container.style.gridTemplateColumns = `repeat(${sz}, 1fr)`;
  container.style.gridTemplateRows    = `repeat(${sz}, 1fr)`;
  drawGrid();
});

function serialize() {
  if (isFinding) return;

  return {
    size: grid.cols,
    start: { x:start.x, y:start.y },
    end:   { x:end.x,   y:end.y   },
    walls: grid.nodes.flat().filter(n=>n.isWall).map(n=>({x:n.x,y:n.y})),
    weights: grid.nodes.flat().filter(n=>n.weight>1).map(n=>({x:n.x,y:n.y,w:n.weight}))
  };
}
function deserialize(d) {
  if (isFinding) return;

  grid = new Grid(d.size,d.size);
  start = grid.getNode(d.start.x,d.start.y);
  end   = grid.getNode(d.end.x,d.end.y);
  d.walls.forEach(({x,y})=>grid.getNode(x,y).isWall=true);
  d.weights.forEach(({x,y,w})=>grid.getNode(x,y).weight=w);
  sizeInput.value = d.size;
  container.style.gridTemplateColumns = `repeat(${d.size},40px)`;
  container.style.gridTemplateRows    = `repeat(${d.size},40px)`;
  drawGrid();
}
saveBtn.addEventListener('click', () => localStorage.setItem('pfState', JSON.stringify(serialize())));
loadBtn.addEventListener('click', () => { const j = localStorage.getItem('pfState'); if(j) deserialize(JSON.parse(j)); });

randomBtn.addEventListener('click', () => {
  if (isFinding) return;

  const openCells = grid.nodes.flat().filter(n => !n.isWall);

  const i = Math.floor(Math.random() * openCells.length);
  let j;
  do {
    j = Math.floor(Math.random() * openCells.length);
  } while (j === i);

  start = openCells[i];
  end   = openCells[j];
  drawGrid();
});

randomWeightsBtn.addEventListener('click', () => {
    if (isFinding) return;

    grid.nodes.flat().forEach(n => {
      if (n !== start && n !== end) {
        n.weight = Math.floor(Math.random()*9) + 1;
      }
    });
    drawGrid();
});

randomWallsBtn.addEventListener('click', () => {
  if (isFinding) return;

  grid.nodes.flat().forEach(n => n.isWall = false);

  const candidates = grid.nodes.flat().filter(n => n !== start && n !== end);
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  const density = 0.3;
  const target = Math.floor(candidates.length * density);
  let placed = 0;

  for (const cell of candidates) {
    if (placed >= target) break;
    cell.isWall = true;
    if (isReachable(start, end, grid)) {
      placed++;
    } else {
      cell.isWall = false;
    }
  }

  drawGrid();
});

findBtn.addEventListener('click', async () => {
  isFinding = true;
  sizeInput.disabled = true; findBtn.disabled = true; resetBtn.disabled = true; randomBtn.disabled = true; mazeBtn.disabled = true; randomWeightsBtn.disabled = true; saveBtn.disabled = true; loadBtn.disabled = true; randomWallsBtn.disabled = true;
  grid.reset(); drawGrid();
  await Dijkstra.findPath(
    grid, start, end,
    async n => document.querySelector(`[data-x="${n.x}"][data-y="${n.y}"]`).classList.add('visited'),
    async n => document.querySelector(`[data-x="${n.x}"][data-y="${n.y}"]`).classList.add('path'),
    () => delay
  );
  isFinding = false;
  sizeInput.disabled = false; findBtn.disabled = false; resetBtn.disabled = false; randomBtn.disabled = false; mazeBtn.disabled = false; randomWeightsBtn.disabled = false; saveBtn.disabled = false; loadBtn.disabled = false; randomWallsBtn.disabled = false;
});