export class Collection<T> {
  
  private items: T[] = [];
  
  getAll(): T[] {
    return this.items;
  }
  
  getByIndex(index: number): T | undefined {
    return this.items[index];
  }
  
  clear(): void {
    this.items = [];
  }
  
  remove(index: number): T[] {
    return this.items.splice(index, 1);
  }
  
  replace(index: number, newItem: T): T {
    return this.items[index] = newItem;
  }
  
}