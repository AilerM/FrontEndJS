### 代码评审 CheckList 清单

####  一、代码静态检查工具
- eslint
- stylelint

#### 二、命名规范
- 1.JS 采用 Camel Case 小驼峰式命名 studentInfot
- 2.避免名称冗余
```js
//good
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue"
};
//bad
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue"
};
```
- 3.CSS 类名采用 BEM 命名规范
- 4.命名符合语义化
```
can 判断是否可执行某个动作
has 判断是否含有某个值
is 判断是否为某个值
```
#### 三、JS 推荐写法
- 1.每个常量都需命名
```js
//good
const COL_NUM = 10;
let row = Math.ceil(num/COL_NUM);
//bad
let row = Math.ceil(num/10);
```
- 2.推荐使用字面量
```js
//good
let obj = {   
     name:'tom',     
     age:15,     
     sex:'男' 
} 
//bad
let obj = {};
obj.name = 'tom';
obj.age = 15;
obj.sex = '男';
```
- 3.对象设置默认属性的推荐写法
```js
//good
const menuConfig = {
  title: "Order",
  // User did not include 'body' key
  buttonText: "Send",
  cancellable: true
};

function createMenu(config) {
  config = Object.assign(
    {
      title: "Foo",
      body: "Bar",
      buttonText: "Baz",
      cancellable: true
    },
    config
  );

  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);

//bad
const menuConfig = {
  title: null,
  body: "Bar",
  buttonText: null,
  cancellable: true
};

function createMenu(config) {
  config.title = config.title || "Foo";
  config.body = config.body || "Bar";
  config.buttonText = config.buttonText || "Baz";
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}

createMenu(menuConfig);
```
- 4.将对象的属性值保存为局部变量
>对象成员嵌套越深，读取速度也就越慢。所以好的经验法则是：如果在函数中需要多次读取一个对象属性，最佳做法是将该属性值保存在局部变量中，避免多次查找带来的性能开销。
```js
//good
let person = {
    info:{
        sex:'男'
    }
}
function  getMaleSex(){
    let sex = person.info.sex;
    if(sex === '男'){
        console.log(sex)
    }
} 
//bad
let person = {
    info:{
        sex:'男'
    }
}
function  getMaleSex(){
    if(person.info.sex === '男'){
        console.log(person.info.sex)
    }
} 
```
- 5.字符串转为整型
>当需要将浮点数转换成整型时，应该使用**Math.floor()或者Math.round()**，而不是使用parseInt()将字符串转换成数字。Math 是内部对象，所以Math.floor()其实并没有多少查询方法和调用时间，速度是最快的。
```js
//good
let num = Math.floor('1.6');
//bad
let num = parseInt('1.6');
```
- 6.函数参数
```js
//good
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
// bad
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
```
- 7.使用参数默认值
```js
// good
function createMicrobrewery(name = "Hipster Brew Co.") {
  // ...
}
// bad
function createMicrobrewery(name) {
  const breweryName = name || "Hipster Brew Co.";
  // ...
}
```
- 8.最小函数准则
- 9.不要写全局方法
```js
// good
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));        
  }
}
// bad
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter(elem => !hash.has(elem));
};
```
- 10.推荐函数式编程
```js
//good
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];
let totalOutput = programmerOutput
  .map(output => output.linesOfCode)
  .reduce((totalLines, lines) => totalLines + lines, 0)

// bad
 const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

let totalOutput = 0;

for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```
- 11.使用多态替换条件语句
```js
//good
class Airplane {
  // ...
}
// 波音777
class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}
// 空军一号
class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}
// 赛纳斯飞机
class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
//bad
class Airplane {
  // ...

  // 获取巡航高度
  getCruisingAltitude() {
    switch (this.type) {
      case '777':
        return this.getMaxAltitude() - this.getPassengerCount();
      case 'Air Force One':
        return this.getMaxAltitude();
      case 'Cessna':
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}
```
- 12.定时器是否清除
```
代码中使用了定时器 setTimeout 和 setInterval，需要在不使用时进行清除。
```
---

#### 四、Vue 推荐写法
- 自定义的组件的名称需要为多个单词 todo -> todo-item
- data 必须是一个函数
- prop 的定义应该尽量详细，至少需要指定其类型。
- 为 v-for 设置键值
- 完整单词的组件名
- 多个特性元素的每个特性分行
- 模板中简单的表达式
- 简单的计算属性
- 指令缩写
- 标签顺序保持一致
- 页面跳转数据传递
- script 标签内部声明顺序 data > prop > components > filter > computed >  watch > 钩子函数（钩子函数按其执行顺序）> methods

#### 五、团队其它规范
- 尽量不手动操作 DOM
- 删除弃用代码
- 保持必要的注释