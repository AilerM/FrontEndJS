## set

```
// 例一
const set = new Set([1, 2, 3, 4, 4]);[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5


s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

// -------
//去重
function dedupe(array) {
  return Array.from(new Set(array));}

dedupe([1, 1, 2, 3]) // [1, 2, 3]


// -------

let a = new Set([1, 2, 3]);let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));

```


