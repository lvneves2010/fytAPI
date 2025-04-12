interface ITimeTravelingHashmap<T> {
    put(key: string, timestamp: number, value: T): void;
    get(key: string, timestamp: number): T | null;
}

class TimeTravelingHashmap<T> implements ITimeTravelingHashmap<T> {
    private store: Map<string, [number, T][]>;

    constructor() {
        this.store = new Map();
    }

    put(key: string, timestamp: number, value: T): void {
        if (!this.store.has(key)) {
            this.store.set(key, []);
        }
        this.store.get(key)!.push([timestamp, value]);
    }

    get(key: string, timestamp: number): T | null {
        if (!this.store.has(key)) return null;

        const arr = this.store.get(key)!;
        let left = 0, right = arr.length - 1;
        let result: T | null = null;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const [midTime, midValue] = arr[mid];
            if (midTime <= timestamp) {
                result = midValue;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}
