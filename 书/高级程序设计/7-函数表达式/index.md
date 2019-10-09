# 函数表达式

## 递归
- arguments.callee 是一个指向正在执行的函数的指针，因此可以用它来实现对函数 的递归调用

## 闭包
- 闭包: 闭包是指有权访问另一个 函数作用域中的变量的函数。
- 作用域链: 本质上是一个指向变量对象的指针列表，它只 引用但不实际包含变量对象。
- 闭包缺点: 由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存
- 活动对象 arguments 参数1 参数2
- 全局活动对象 compareNames createComparisonFunction
>在匿名函数从 createComparisonFunction()中被返回后，它的作用域链被初始化为包含 createComparisonFunction()函数的活动对象和全局变量对象。这样，匿名函数就可以访问在 createComparisonFunction()中定义的所有变量。

>当 createComparisonFunction()函数返回后，其执行环境的作用域链会被销毁，但它的活 动对象仍然会留在内存中;直到匿名函数被销毁后，createComparisonFunction()的活动对象才会 被销毁
```js
//创建函数
var compareNames = createComparisonFunction("name");
//调用函数
var result = compareNames({ name: "Nicholas" }, { name: "Greg" });
//解除对匿名函数的引用(以便释放内存) compareNames = null;
```
## 块级作用域
```js
(function(){
//这里是块级作用域 
})();
```

## 私有变量
- 任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。
- 特权方法: 我们把有权访问私有变量和私有函数的公有方法
- 函数表达式不同于函数声明。函数声明要求有名字，但函数表达式不需要。没有名字的函数表 达式也叫做匿名函数（拉达姆函数）
- 在无法确定如何引用函数的情况下，递归函数就会变得比较复杂
- 递归函数应该始终使用 arguments.callee 来递归地调用自身，不要使用函数名——函数名可
能会发生变化。