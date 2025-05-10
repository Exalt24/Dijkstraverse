import { Grid }    from './grid.js';
import { Dijkstra } from './algorithm.js';
import { MazeGenerator } from './maze.js';

const container  = document.getElementById('gridContainer');
const findBtn    = document.getElementById('findPathBtn');
const resetBtn   = document.getElementById('resetBtn');
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
  if (el?.classList.contains('cell')) {
    const x = +el.dataset.x, y = +el.dataset.y;
    if (dragging === 'start') start = grid.getNode(x,y);
    else                      end   = grid.getNode(x,y);
    drawGrid();
  }
  dragging = null;
});
container.addEventListener('mouseover', e => {
  if (dragging && e.target.classList.contains('cell'))
    e.target.classList.add('drag-over');
});
container.addEventListener('mouseout', e => {
  if (e.target.classList.contains('cell'))
    e.target.classList.remove('drag-over');
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
  return {
    size: grid.cols,
    start: { x:start.x, y:start.y },
    end:   { x:end.x,   y:end.y   },
    walls: grid.nodes.flat().filter(n=>n.isWall).map(n=>({x:n.x,y:n.y})),
    weights: grid.nodes.flat().filter(n=>n.weight>1).map(n=>({x:n.x,y:n.y,w:n.weight}))
  };
}
function deserialize(d) {
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

findBtn.addEventListener('click', async () => {
  isFinding = true;
  sizeInput.disabled = true; findBtn.disabled = true; resetBtn.disabled = true;
  grid.reset(); drawGrid();
  await Dijkstra.findPath(
    grid, start, end,
    async n => document.querySelector(`[data-x="${n.x}"][data-y="${n.y}"]`).classList.add('visited'),
    async n => document.querySelector(`[data-x="${n.x}"][data-y="${n.y}"]`).classList.add('path'),
    () => delay
  );
  isFinding = false;
  sizeInput.disabled = false; findBtn.disabled = false; resetBtn.disabled = false;
});

document.getElementById('randWeightsBtn').addEventListener('click', () => {
    grid.nodes.flat().forEach(n => {
      if (n !== start && n !== end) {
        n.weight = Math.floor(Math.random()*9) + 1;
      }
    });
    drawGrid();
});