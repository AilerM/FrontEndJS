## ES9

### Array.prototype.flat()
递归地将嵌套数组拼合到指定深度。默认值为 1，如果要全深度则使用 Infinity 。此方法不会修改原始数组，但会创建一个新数组:
```js
const arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(2); 
// [1, 2, 3, 4, 5, 6]

const arr3 = [1, 2, [3, 4, [5, 6, [7, 8]]]];
arr3.flat(Infinity); 
// [1, 2, 3, 4, 5, 6, 7, 8]

```
flat()方法会移除数组中的空项:
```js
const arr4 = [1, 2, , 4, 5];
arr4.flat(); // [1, 2, 4, 5]
```

### Array.prototype.flatMap()
方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组
```js
const arr1 = [1, 2, 3];

arr1.map(x => [x * 4]); 
// [[4], [8], [12]]

arr1.flatMap(x => [x * 4]); 
// [4, 8, 12]

```
```js
const sentence = ["This is a", "regular", "sentence"];

sentence.map(x => x.split(" ")); 
// [["This","is","a"],["regular"],["sentence"]]

sentence.flatMap(x => x.split(" ")); 
// ["This","is","a","regular", "sentence"]

// 可以使用 归纳（reduce） 与 合并（concat）实现相同的功能
sentence.reduce((acc, x) => acc.concat(x.split(" ")), []);
```

### String.prototype.trimStart() 和 String.prototype.trimEnd()
```js
const test = " hello ";

test.trim(); // "hello";
test.trimStart(); // "hello ";
test.trimEnd(); // " hello";
```

### Object.fromEntries
```js
const obj = { prop1: 2, prop2: 10, prop3: 15 };

// 转化为键值对数组：
let array = Object.entries(obj); 
// [["prop1", 2], ["prop2", 10], ["prop3", 15]]

// 将所有对象属性的值平方:
array = array.map(([key, value]) => [key, Math.pow(value, 2)]); 
// [["prop1", 4], ["prop2", 100], ["prop3", 225]]

// 我们将转换后的数组 array 作为参数传入 Object.fromEntries ，将数组转换成了一个对象:
const newObj = Object.fromEntries(array); 
// {prop1: 4, prop2: 100, prop3: 225}
```

[ES6789](https://juejin.im/post/5ca2e1935188254416288eb2#heading-29)
[ES6789](https://juejin.im/post/5b9cb3336fb9a05d290ee47e#heading-29)