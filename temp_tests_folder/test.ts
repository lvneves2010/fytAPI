class TimeMapTS {
    private store: Record<string, [string, number][]>;
  
    constructor() {
      this.store = {}; // key: list of [value, timestamp]
    }
  
    set(key: string, value: string, timestamp: number): void {
      if (!(key in this.store)) {
        this.store[key] = [];
      }
      this.store[key].push([value, timestamp]);
    }
  
    get(key: string, timestamp: number): string {
      let res = "";
      const values = this.store[key] || [];
  
      // binary search
      let l = 0;
      let r = values.length - 1;
  
      while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (values[m][1] <= timestamp) {
          res = values[m][0];
          l = m + 1;
        } else {
          r = m - 1;
        }
      }
  
      return res;
    }
  }
  