class Data:
    def __init__(self, value: str, timestamp: int):
        self.value = value
        self.timestamp = timestamp

class TimeMapPY:
    def __init__(self):
        self.map = {}  # key -> List[Data]

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.map:
            self.map[key] = []
        self.map[key].append(Data(value, timestamp))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.map:
            return ""

        data = self.map[key]
        return self._binary_search(data, timestamp)

    def _binary_search(self, data: list, timestamp: int) -> str:
        l, r = 0, len(data) - 1
        res = ""

        while l <= r:
            m = (l + r) // 2
            if data[m].timestamp <= timestamp:
                res = data[m].value
                l = m + 1
            else:
                r = m - 1

        return res
