import * as readline from "readline";

interface ITimeTravelingHashmap<T> {
    put(key: string, timestamp: number, value: T);
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

const solution = (s: string): string => {
    const tth = new TimeTravelingHashmap<string>();

    for (const line of s.split(";")) {
        const [action, key, timestampStr, value] = line.split(" ");
        const timestamp = Number.parseInt(timestampStr);

        if (action === "put") {
            tth.put(key, timestamp, value);
        } else {
            const result = tth.get(key,timestamp);
            return result
        }
    }
    return ""
}

const main = (): void => {
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let n: string;
    r1.on("line", (input: string) => {
        n = input;
    }).on("close", () => {
        console.log(solution(n));
    });
}

main()