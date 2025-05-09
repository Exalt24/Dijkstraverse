export class MinHeap {
    constructor() { this.items = []; }
    _parent(i) { return Math.floor((i - 1) / 2); }
    _left(i)   { return 2 * i + 1; }
    _right(i)  { return 2 * i + 2; }
  
    push(node) {
      this.items.push(node);
      this._bubbleUp(this.items.length - 1);
    }
  
    pop() {
      if (!this.items.length) return null;
      this._swap(0, this.items.length - 1);
      const top = this.items.pop();
      this._sinkDown(0);
      return top;
    }
  
    _bubbleUp(i) {
      const parent = this._parent(i);
      if (i > 0 && this.items[i].distance < this.items[parent].distance) {
        this._swap(i, parent);
        this._bubbleUp(parent);
      }
    }
  
    _sinkDown(i) {
      const left = this._left(i), right = this._right(i);
      let smallest = i;
      if (left < this.items.length && this.items[left].distance < this.items[smallest].distance)
        smallest = left;
      if (right < this.items.length && this.items[right].distance < this.items[smallest].distance)
        smallest = right;
      if (smallest !== i) {
        this._swap(i, smallest);
        this._sinkDown(smallest);
      }
    }
  
    _swap(a, b) {
      [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
    }
}
  