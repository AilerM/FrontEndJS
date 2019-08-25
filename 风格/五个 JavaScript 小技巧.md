# 5 Programming Patterns I Like

- 1. Early exits
- 2. Switch to object literal
- 3. One loop two arrays
- 4. No 'foo' variables
- 5. Nested ternaries


## 1. Early exits
```js
function transformData(rawData) {
  // check if no data
  if (!rawData) {
    return [];
  }

  // check for specific case
  if (rawData.length == 1) {
    return [];
  }

  // actual function code goes here
  return rawData.map((item) => item);
}
```
- 鼓励思考无效/边缘情况以及如何处理这些情况
- 避免意外和不必要的代码处理意外用例
- 在心理上允许我更清楚地处理每个用例
- 这通常遵循自上而下的方法 - 无效情况 - >小案例 - >预期案例

## Switch to object literal
```js
// Switch
let createType = null;
switch (contentType) {
  case "post":
    createType = () => console.log("creating a post...");
    break;
  case "video":
    createType = () => console.log("creating a video...");
    break;
  default:
    createType = () => console.log('unrecognized content type');
}

createType();

// Object literal
const contentTypes = {
  post: () => console.log("creating a post..."),
  video: () => console.log("creatinga  video..."),
  default: () => console.log('unrecognized content type')
};

const createType = contentTypes[contentType] || contentTypes['default'];
createType();
```
- 不必担心case或break
- 更容易阅读并快速了解正在发生的事情
- 对象文字很容易写
- 更少的代码

## 3. One loop two arrays
```js
const exampleValues = [2, 15, 8, 23, 1, 32];
const [truthyValues, falseyValues] = exampleValues.reduce((arrays, exampleValue) => {
  if (exampleValue > 10) {
    arrays[0].push(exampleValue);
    return arrays;
  }

  arrays[1].push(exampleValue);
  return arrays;
}, [[], []]);
```

## 4. No 'foo' variables
```js
// bad
const foo = y && z;

// good
const isPostEnabled = isPost && postDateValid;
```

## 5. Nested ternaries 嵌套三元组
```js
let result = null;
if (conditionA) {
  if (conditionB) {
    result = "A & B";
  } else {
    result = "A";
  }
} else {
  result = "Not A";
}

const result = !conditionA
  ? "Not A"
  : conditionB
  ? "A & B"
  : "A";
```

[五个 JavaScript 小技巧](https://www.johnstewart.dev/five-programming-patterns-i-like/)
[30secondsofcode](https://www.30secondsofcode.org/)