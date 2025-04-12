class Data {
    constructor(value, timestamp) {
      this.value = value;
      this.timestamp = timestamp;
    }
  }
  
  class TimeMap {
    constructor() {
      this.map = new Map(); // key -> array of Data objects
    }
  
    set(key, value, timestamp) {
      if (!this.map.has(key)) {
        this.map.set(key, []);
      }
      this.map.get(key).push(new Data(value, timestamp));
    }
  
    get(key, timestamp) {
      if (!this.map.has(key)) return "";
  
      const dataList = this.map.get(key);
      return this._binarySearch(dataList, timestamp);
    }
  
    _binarySearch(dataList, timestamp) {
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
  