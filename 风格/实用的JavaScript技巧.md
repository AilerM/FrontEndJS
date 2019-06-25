## 实用的JavaScript技巧

### 目录
- 1. 确保数组的长度
- 2. 数组去重
- 3. 数组映射（不使用 Array.map）
- 4. 二维变一维


1. 确保数组的长度
```js
let array = Array(5).fill('');
console.log(array); // 输出（5）["", "", "", "", ""]
```

2. 数组去重
```js
const cars = [
    'Mazda', 
    'Ford', 
    'Renault', 
    'Opel', 
    'Mazda'
]
const uniqueWithArrayFrom = Array.from(new Set(cars));
console.log(uniqueWithArrayFrom); // 输出 ["Mazda", "Ford", "Renault", "Opel"]

const uniqueWithSpreadOperator = [...new Set(cars)];
console.log(uniqueWithSpreadOperator);// 输出 ["Mazda", "Ford", "Renault", "Opel"]
```

3. 数组映射（不使用 Array.map）
```js
const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'no' },
    { name: 'Marseille', visited: 'yes' },
    { name: 'Rome', visited: 'yes' },
    { name: 'Milan', visited: 'no' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'yes' },
    { name: 'Berlin', visited: 'no' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'yes' }
];

const cityNames = Array.from(cities, ({ name}) => name);
console.log(cityNames);
// 输出 ["Paris", "Lyon", "Marseille", "Rome", "Milan", "Palermo", "Genoa", "Berlin", "Hamburg", "New York"]
```

4. 二维变一维
```js
Array.prototype.concat.apply([], this.filters)
```