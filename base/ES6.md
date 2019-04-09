## 目录
- 0: set
- 1: 什么是提升？什么是暂时性死区？var、let 及 const 区别？
- 2: **原型继承和 Class 继承**
- 3: **为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？**
- 4: **Proxy 可以实现什么功能？**
- 5: **map, filter, reduce 各自有什么作用？**
- 6: **你理解的 Generator 是什么？**


### 0: set

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


1： **什么是提升？什么是暂时性死区？var、let 及 const 区别？**

>`函数提升`优先于`变量`提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部

>var 存在提升，我们能在声明之前使用。let、const 因为`暂时性死区`的原因，不能在声明前使用

>var 在全局作用域下声明变量会导致变量`挂载在 window`上，其他两者不会

>let 和 const 作用基本一致，但是后者声明的变量不能再次赋值

2: **原型继承和 Class 继承**
>其实在 JS 中并不存在类，class 只是语法糖，本质还是函数
```
class Person {}
Person instanceof Function // true
```
- 组合继承
>组合继承是最常用的继承方式

>这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以`复用父类`的函数，但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在`内存`上的浪费

- 寄生组合继承
>这种继承方式对组合继承进行了优化，组合继承缺点在于`继承父类函数时调用了构造函数`，我们只需要优化掉这点就行了

>以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。

- Class 继承
>class 实现继承的核心在于使用 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super`，因为这段代码可以看成 Parent.call(this, value)。

3: **为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？**

```
解决命名冲突
提供复用性
提高代码可维护性
```
AMD CMD
```es6
// AMD
define(['./a', './b'], function(a, b) {
  // 加载模块完毕可以使用
  a.do()
  b.do()
})
// CMD
define(function(require, exports, module) {
  // 加载模块
  // 可以把 require 写在函数体的任意地方实现延迟加载
  var a = require('./a')
  a.doSomething()
})
//ES Module

// 引入模块 API
import XXX from './a.js'
import { XXX } from './a.js'
// 导出模块 API
export function a() {}
export default function() {}

```

4: **Proxy 可以实现什么功能？**

5: **map, filter, reduce 各自有什么作用？**
>map 作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后放入到新的数组中。

>filter 的作用也是生成一个新数组，在遍历数组的时候将返回值为 `true` 的元素放入新数组，我们可以利用这个函数删除一些不需要的元素

```es6
let array = [1, 2, 4, 6]
let newArray = array.filter(item => item !== 6)
console.log(newArray) // [1, 2, 4]
```

> reduce 来说，它接受两个参数，分别是回调函数和初始值，接下来我们来分解上述代码中 reduce 的过程

```es6
const arr = [1, 2, 3]
const mapArray = arr.map(value => value * 2)
const reduceArray = arr.reduce((acc, current) => {
  acc.push(current * 2)
  return acc
}, [])
console.log(mapArray, reduceArray) // [2, 4, 6]
```

6: **你理解的 Generator 是什么？**

```es6
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```
>首先 Generator 函数调用和普通函数不同，它会返回一个迭代器

>当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6

>当执行第二次 next 时，传入的参数等于上一个 yield 的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 * 12，所以第二个 yield 等于 2 * 12 / 3 = 8

>当执行第三次 next 时，传入的参数会传递给 z，所以 z = 13, x = 5, y = 24，相加等于 42