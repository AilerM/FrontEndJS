# BOM

- 全局变量不能通过 delete 操作符删除，而直接在 window 对象上的定义的属性可以。 例如:
```js
//在IE < 9 时抛出错误，在其他所有浏览器中都返回false 
delete window.age;
//在IE < 9 时抛出错误，在其他所有浏览器中都返回true 
delete window.color; //returns true
alert(window.age);   //29
alert(window.color); //undefined
```
- IE8 及更早版本在遇到使用 delete 删除 window 属性的语句时，不管该属性最初是如何创建的，都会抛出错误，以示警告。IE9 及更高版 本不会抛出错误。

## 弹出窗口屏蔽程序
```js
var blocked = false;
try {
  var wroxWin = window.open("http://www.wrox.com", "_blank");
  if (wroxWin == null){
    blocked = true;
  }
} catch (ex){
  blocked = true;
}
if (blocked){
  alert("The popup was blocked!");
}
```