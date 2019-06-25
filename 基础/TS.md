## start-with-typescript
>[start-with-typescript](https://github.com/dzfrontend/start-with-typescript)

### 目录
*  一、TypeScript数据类型
*  二、TypeScript函数
*  三、TypeScript类 接口
*  四、TypesSript泛型 

#### 一、TypeScript数据类型
```
在typescript中主要给我们提供了以下数据类型：

字符串类型(string)
数字类型(number)
布尔类型(boolean)
null和undefined
数组类型(array)
元组类型(tuple)
枚举类型(enum)
任意类型(any)
void类型
never类型

```

- boolean number string 
```ts
var num:number = 12
var str:string = 'test'
var flag:boolean = true

flag = false // 正确
```
- null undefined
```ts
{
    // 在js中，变量已声明但未初始化为undefined
    var undefinedTest:number
    // console.log(undefinedTest) // 错误写法，typescript报错，赋值了才正确

    // 在typescript中，已声明未初始化的值要直接访问的话类型需要定义为undefined
    var undefinedTest2:undefined
    console.log(undefinedTest2) // 正确写法，输出undefined 
}
{
    // 可能是number类型 可能是undefined
    var undefinedTest3:number | undefined;
    console.log(num);
}
```
- null
```ts
// null是一个空指针对象，undefined是未初始化的变量。因此，可以把undefined看作是空的变量，而null看作是空的对象
var nullTest:null
nullTest = null
// nullTest = {} // 错误，定义了类型是null，值必须为null
```
- array
```ts
// 第一种
var arr:number[] = [1, 2, 3]
// 第二种
var arr2:Array<number> = [1, 2, 3]
```
- tuple
```ts
let arr:[number,string] = [123,'this is ts']
```
- enum
```ts
enum Flag {success = 1,error = 2};

let s:Flag = Flag.success // 使用枚举类型中的值
console.log('正确状态',s)
let f:Flag = Flag.error
console.log('错误状态',f)
```
- any
```ts
var number:any = 123
number = 'str'
number = true
```
- void
```ts
// 表示方法没有返回任何类型
function run(): void {
    console.log('run')
}

run()
```
>
- never
```ts
var a:never
// a = 123 //错误写法
a = (() => {
    throw new Error('错误');
})()
```

----


#### 二、TypeScript函数
>函数的定义、可选参数、默认参数、剩余参数、函数重载、箭头函数。

- 定义
```ts
// 函数声明
function fn(x: Type, y: Type): Type {}

// 函数表达式
var fn = (x: Type, y: Type): Type => {}

// 函数表达式：指定变量fn的类型
var fn: (x: Type, y: Type) => Type = (x, y) => {}
```
```ts
// 函数声明法
function run(x: number, y: number): number {
    return x + y;
}

// 函数表达式法
var run2 = (x: number, y: number): string => {
    return 'run2'
}

run(1, 2);
run2(1, 2);
```
```ts
函数表达式法另外一种写法
var run3: (x: number, y: number) => string = function(x: number, y: number): string{
    return 'run3';
}
run3(1, 2);
```
- 可选参数
```ts
function electParam(name:string, age?:number):string {
    // 这里的age可传可不传，age就是可选参数
    if(age){
        return `${name} --- ${age}`
    }else{
        return `${name} --- 年龄保密`
    }
}
console.log('可选参数', electParam('dz'))

// 注意: 可选参数必须配置到参数的最后面

// 错误写法：可选参数不在**最后面**
// function electParam2(name?: string, age: number): string {
//     ...
// }

```
- 默认参数
```ts
// age为默认参数
function defaultParam(name:string, age:number = 20):String {
    return `${name} --- ${age}`
}

console.log('默认参数', defaultParam('dz'))
```

- 剩余参数
```ts
// sum参数传过来的是一个数组
function sum(...result: number[]): number {
    var sum = 0;

    for (var i = 0; i < result.length; i++) {

        sum += result[i];
    }

    return sum;
}
console.log('剩余参数', sum(1, 2, 3, 4, 5, 6));

// a=1 b=2 其他参数为剩余参数
function sum2(a: number, b: number, ...result: number[]): number {
    var sum = a * b;

    for (var i = 0; i < result.length; i++) {

        sum += result[i];
    }

    return sum;
}
console.log('剩余参数2', sum2(1, 2, 3, 4, 5, 6));

```
- 函数重载
>java中方法的重载：重载指的是两个或者两个以上同名函数，但它们的参数不一样，这时会出现函数重载的情况。
typescript中的重载：通过为同一个函数提供多个函数类型定义来实现多种功能的目的。
ts为了兼容es5以及es6，重载的写法和java中有区别。
```ts
function overloadingFn(x: number, y: number): number;
function overloadingFn(x: string, y: string): string;

// 上面定义函数的格式，下面定义函数的具体实现
function overloadingFn(x: any, y: any): any {
    return x + y;
}

overloadingFn(1, 2);
overloadingFn('a', 'b');
```
- 箭头函数
```ts
setTimeout(() => {
    console.log('箭头函数')
}, 1000);
```

---

#### 三、TypeScript类


#### 四、TypeScript泛型
- 泛型函数
```ts
function dataT<T>(value:T):T{
    // 传入参数为T 返回值为T
    return value
}
dataT<number>(1) // 调用指定泛型为number类型，则传入参数也必须为number类型
dataT<string>('string')

function dataAny<T>(value:T):any{
    return '传入参数为T，任意类型返回值';
}
dataAny<number>(123); // 参数必须是number
dataAny<string>('这是一个泛型');
```
- 泛型类
```ts
class MinClassT<T>{
    public list:T[]=[];
    add(value:T):void{
        this.list.push(value);
    }
    min():T{        
        var minNum=this.list[0];
        for(var i=0;i<this.list.length;i++){
            if(minNum>this.list[i]){
                minNum=this.list[i];
            }
        }
        return minNum;
    }
}
var m1=new MinClassT<number>();   /*实例化类 并且指定了类的T代表的类型是number*/
m.add(1);
m.add(2);
alert(m1.min())

var m2=new MinClassT<string>();   /*实例化类 并且指定了类的T代表的类型是string*/
m2.add('c');
m2.add('a');
alert(m2.min())
```
```ts
// 泛型接口定义方式一
interface ConfigFnOne{
    <T>(value:T):T;
}
var setDataOne:ConfigFnOne = function<T>(value:T):T{
    return value
}
// 既可以传入string也可以传入number类型参数
setDataOne<string>('name');
setDataOne<number>(20);

// 泛型接口定义方式二
interface ConfigFnTwo<T>{
    (value:T):T;
}
function setDataTwo<T>(value:T):T{
    return value
}
var setDataTwoFn:ConfigFnTwo<string> = setDataTwo
setDataTwoFn('name');
```