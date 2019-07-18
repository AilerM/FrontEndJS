## 实用的JavaScript技巧

### 目录
- 1. 确保数组的长度
- 2. 数组去重
- 3. 数组映射（不使用 Array.map）
- 4. 二维变一维
- 5. 数组去重
- 6. 获得数组最大最小值
- 7. 获取数组交集

1. 确保数组的长度
```js
let array = Array(5).fill('');
console.log(array); // 输出（5）["", "", "", "", ""]
```

2. 数组去重 
- ES6
```js
const cars = [
    'Mazda', 
    'Ford', 
    'Renault', 
    'Opel', 
    'Mazda'
]
const uniqueWithArrayFrom = Array.from(new Set(cars));
console.log(uniqueWithArrayFrom); //输出 ["Mazda", "Ford", "Renault", "Opel"]

const uniqueWithSpreadOperator = [...new Set(cars)];
console.log(uniqueWithSpreadOperator);// 输出 ["Mazda", "Ford", "Renault", "Opel"]


```
- other
```js
function uniq(array){
    let temp = [];
    let l = array.length;
    for(let i = 0; i < l; i++) {
        for(let j = i + 1; j < l; j++){
            if (array[i] === array[j]){
                i++;
                j = i;
            }
        }
        temp.push(array[i]);
    }
    return temp;
}
console.log(uniq(arrs)); // [1,2,3,6,5]

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

5. 数组去重
```js
let arr1 = [1,2,3]
let arr2 = [4,5,6]

// ES6
[...arr1, ...arr2] // [1, 2, 3, 4, 5, 6]


// 方法2：concat方法（挂载Array原型链上）
let c = a.concat(b);
console.log(c); // [1, 2, 3, 4, 5, 6]
console.log(a); // [1, 2, 3]  不改变本身
// 备注：看似concat似乎是 数组对象的深拷贝，其实，concat 只是对数组的第一层进行深拷贝

// 方法3：apply方法
Array.prototype.push.apply(a, b);
console.log(a); // [1, 2, 3, 4, 5, 6] 改变原目标数组
console.log(b); // [4, 5, 6]
```

6. 获得数组最大最小值
```js

// 使用 Math 中的 max/min 方法
let arr = [22,13,6,55,30];

// ES6
Math.max(...arr); // 55
Math.min(...arr); // 6

// ES5
Math.max.apply(null, arr); // 55
Math.min.apply(null, arr); // 6

```

7. 获取数组交集
```js
// ES6 写法
const similarity = (arr1, arr2) => arr1.filter(v => arr2.includes(v));
similarity([1, 2, 3], [1, 2, 4]); // [1,2]
```