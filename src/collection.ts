export class Collection<T> {
  private items: T[] = [];
  
  getAll() {
    return this.items;
  }
  
  get(index: number) {
    return this.items[index];
  }
  
  clear() {
    this.items = [];
  }
  
  remove(index: number) {
    return this.items.splice(index, 1);
  }
  
  replace(index: number, newItem: T) {
    return this.items[index] = newItem;
  }
}