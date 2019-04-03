##### JS条件语句

- 1.判断存在 Array.includes
- 2.Array.indexOf于Array.includes应用场景
- 3.更少的嵌套，尽早 return
- 4.默认参数和解构
- 5.遍历对象而不是 Switch 语句
- 6.对 所有/部分 判断使用 Array.every & Array.some
- 7.Array.find/filter/some/Array.includes/reduce

##### 1.判断存在 Array.includes
```
// --------- before
function test(data) {
  if (data === 'null' || data === null || data === undefined) {
    console.log('through')
  }
}

// --------- after
function test(data) {
  const arr = ['null', '', null, 'undefined' , undefined, 'red']
  if (arr.includes(data)) {
    console.log('through')
  }
}
```

##### 2.Array.indexOf于Array.includes应用场景
- Array.indexOf
> 如果需要在数组中查找某个元素，请使用 Array.indexOf。
对 Array.indexOf 的描述是：返回在数组中可以找到一个给定元素的第一个`索引`，如果不存在，则返回-1

- Array.includes
> 如果我们仅需要知道数组中是否包含给定元素，针对这种情况，我建议使用直接返回`布尔值`的 Array.includes

##### 3.更少的嵌套，尽早 return
```
// --------- before
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // 条件 1: fruit 必须有值
  if (fruit) {
    // 条件 2: 必须是red的
    if (redFruits.includes(fruit)) {
      console.log('red');

      // 条件 3: quantity大于10
      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}

// --------- after1
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // 条件 1: 尽早抛出错误
  if (!fruit) throw new Error('No fruit!');

  // 条件 2: 必须是红色的
  if (redFruits.includes(fruit)) {
    console.log('red');

    // 条件 3: 必须是大质量的
    if (quantity > 10) {
      console.log('big quantity');
    }
  }
}

// --------- after2
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // 条件 1: 尽早抛出错误
  if (!fruit) throw new Error('No fruit!');
  // 条件 2: 当水果不是红色时停止继续执行
  if (!redFruits.includes(fruit)) return;

  console.log('red');

  // 条件 3: 必须是大质量的
  if (quantity > 10) {
    console.log('big quantity');
  }
}
```

##### 4.默认参数和解构
```
// --------- before
function test(fruit, quantity) {
  if (!fruit) return;
  // 如果 quantity 参数没有传入，设置默认值为 1
  const q = quantity || 1;

  console.log(`We have ${q} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!

// --------- after
function test(fruit, quantity = 1) {
  // 如果 quantity 参数没有传入，设置默认值为 1
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```

- 函数参数是对象

```
// --------- before
function test(fruit) {
  if (fruit && fruit.name)  {
    console.log (fruit.name);
  } else {
    console.log('unknown');
  }
}
//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple

// --------- after
// 解构 - 仅仅获取 name 属性
// 为其赋默认值为空对象
function test({name} = {}) {
  console.log (name || 'unknown');
}

// test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

##### 5.遍历对象而不是 Switch 语句

```
// --------- before
function test(color) {
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

// test results
test(null); // []
test('yellow'); // ['banana', 'pineapple']

// --------- after1
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum']
};

function test(color) {
  return fruitColor[color] || [];
}

// --------- after2
const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function test(color) {
  return fruitColor.get(color) || [];
}

// --------- TL;DR; 重构语法
const fruits = [
   { name: 'apple', color: 'red' },
   { name: 'strawberry', color: 'red' },
   { name: 'banana', color: 'yellow' },
   { name: 'pineapple', color: 'yellow' },
   { name: 'grape', color: 'purple' },
   { name: 'plum', color: 'purple' }
];
function test(color) {
 return fruits.filter(f => f.color == color);
}
```

##### 6.对 所有/部分 判断使用 Array.every & Array.some

```
// --------- before
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  let isAllRed = true;

  // 条件：`所有`水果都是红色
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed); // false
}

// --------- after

const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  const isAllRed = fruits.every(f => f.color == 'red');
  console.log(isAllRed); // false
}

// --------- after
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];

function test() {
  // 条件：任何一个水果是红色
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true
}
```

#### 7.Array.find/filter/some/Array.includes/reduce
- Array.find 与 Array.filter
 - Array.filter 必须遍历`整个数组`, 返回一个仅有一项的新数组
 - Array.find。它与 Array.filter 一样需要一个回调函数，（但只是返回）符合条件的第一项，当找到符合回调函数过滤条件的第一个元素时，它会立即`停止`往下的搜寻
 - Array.filter
- Array.some 与 Array.includes
 - 相同：两者都返回一个布尔值，表示某项是否存在于数组之中，一旦找到对应的项，立即停止遍历数组。
 - 不同：Array.some 的参数是`回调函数`，而 Array.includes 的参数是一个`值`
 - 总结：Array.includes 使用更简单，Array.some 可操控性更强。

```
const characters = [
  { id: 1, name: 'ironman' },
  { id: 2, name: 'black_widow' },
  { id: 3, name: 'captain_america' },
  { id: 4, name: 'captain_america' },
];

function getCharacter(name) {
  return character => character.name === name;
}

console.log(characters.filter(getCharacter('captain_america')));
// [
//   { id: 3, name: 'captain_america' },
//   { id: 4, name: 'captain_america' },
// ]

console.log(characters.find(getCharacter('captain_america')));
// { id: 3, name: 'captain_america' }

console.log(characters.some(getCharacter('captain_america')));
// true
```

- Array.reduce 代替 Array.filter 与 Array.map 的组合
>Array.filter 过滤原数组，之后（对结果）再调用 Array.map （以获取一个新数组）,我们遍历了两次数组,Array.reduce 允许你将过滤后切加工过的项放进累加器中。累加器可以是需要待递增的数字、待填充的对象、 待拼接的字符串或数组等。

```
const characters = [
  { name: 'ironman', env: 'marvel' },
  { name: 'black_widow', env: 'marvel' },
  { name: 'wonder_woman', env: 'dc_comics' },
];

console.log(
  characters
    .filter(character => character.env === 'marvel')
    .map(character => Object.assign({}, character, { alsoSeenIn: ['Avengers'] }))
);
// [
//   { name: 'ironman', env: 'marvel', alsoSeenIn: ['Avengers'] },
//   { name: 'black_widow', env: 'marvel', alsoSeenIn: ['Avengers'] }
// ]

console.log(
  characters
    .reduce((acc, character) => {
      return character.env === 'marvel'
        ? acc.concat(Object.assign({}, character, { alsoSeenIn: ['Avengers'] }))
        : acc;
    }, [])
)
// [
//   { name: 'ironman', env: 'marvel', alsoSeenIn: ['Avengers'] },
//   { name: 'black_widow', env: 'marvel', alsoSeenIn: ['Avengers'] }
// ]

```
