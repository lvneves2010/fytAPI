class DataTS {
    value: string;
    timestamp: number;
  
    constructor(value: string, timestamp: number) {
      this.value = value;
      this.timestamp = timestamp;
    }
  }
  
  class TimeMapTS {
    private map: Map<string, Data[]>;
  
    constructor() {
      this.map = new Map();
    }
  
    set(key: string, value: string, timestamp: number): void {
      if (!this.map.has(key)) {
        this.map.set(key, []);
      }
      this.map.get(key)!.push(new Data(value, timestamp));
    }
  
    get(key: string, timestamp: number): string {
      if (!this.map.has(key)) return "";
  
      const dataList = this.map.get(key)!;
      return this.binarySearch(dataList, timestamp);
    }
  
    private binarySearch(dataList: Data[], timestamp: number): string {
      let l = 0;
      let r = dataList.length - 1;
      let res = "";
  
      while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (dataList[m].timestamp <= timestamp) {
          res = dataList[m].value;
          l = m + 1;
        } else {
          r = m - 1;
        }
      }
  
      return res;
    }
  }
  