```js
    _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      //如果没有排序
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    /**
    ** 此处_.iteratee
    **  function (key){
    *      return function(obj){
    *        return obj[key];
    *      }
    **  }
    **  key就是这里的iteratee（对象的属性）,这里使用了闭包
    **/
    if (iteratee != null) iteratee = _.iteratee(iteratee, context); 
    var result = [];//返回去重后的数组（副本）
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];//当前比较值
      if (isSorted) {
        //如果i=0时，或者seen（上一个值）不等于当前值，放入去重数组中
        if (!i || seen !== value) result.push(value); 
        seen = value;//保存当前值，用于下一次比较
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

```



```js
typeof null 也是object
var  0  is undefined
<!DOCTYPE html>
<html>

     <head>
           <meta charset="UTF-8">
           <title></title>
     </head>

     <body>
           <button id="btn">buton</button>
           <script type="text/javascript" src="underscore.js"></script>
           <script type="text/javascript">
                //bind、bindAll、delay、after、once、keys、allKeys、values、mapObject、pairs、pick
                //undersccore类库为扩展库  ,快捷实现原生JS不具有的功能
                //下划线【_】是对象
                //underscore类库把所有功能函数当作"_"对象的方法。
                //通过访问对象方法获取该函数，

                //=============bind=====================
                //函数func绑定到对象objs上，任何时候函数中的this都指向对象objs
                var func = function(greeting) {
                     console.log(greeting + ':' + this.name);
                     console.log(greeting + ':' + this.age);
                     console.log(greeting + ':' + this.gender);
                     this.sayHi();
                     //return greeting+':'+this.name,
                }
                var objs = {
                     name: 'lemmon',
                     age: '12',
                     gender: 'femal',
                     sayHi: function() {
                           console.log(this.gender + " hello");
                     },
                     sayBey: function() {
                           console.log(this.name + " bey");
                     }
                }
                func = _.bind(func, objs, "myobjs");
                func();

                //=============bindAll?=====================
                //========================delay===================
                function b(m) {
                     console.log(m + "延迟1秒触发的值");
                }
                _.delay(b, 1000, 'afdasf');
                //========================after?===================
                //              _.after(count, function)
                //创建一个函数，只有在运行了制定次数之后出项效果，

                //========================once===================
                function createApplication() {
                     console.log("只会调用一次!");
                }
                var initialize = _.once(createApplication);
                initialize();
                initialize();

                //========================keys===================
                //检索对象所有的属性|方法名称
                var obj = {
                     name: "lemon",
                     age: "20",
                     gender: "female",
                     fff: function() {},
                }
                console.log(_.keys(obj));

                //========================allkeys===================
                //检索对象所有的（属性|方法）包括【原型属性】
                function Stooge(name, age) {
                     this.name = name;
                     this.age = age;
                     this.foo = function() {
                           console.log(this.name)
                     };
                }
                Stooge.prototype.silly = true;
                Stooge.prototype.foos = function() {};
                var newStooge = new Stooge("ailer", "20");
                console.log(_.allKeys(new Stooge("Moe")));

                //========================values===================
                //获取对象所有的属性值
                console.log(_.values(newStooge));
                //========================mapObject===================
                //修改对象属性值
                console.log(_.mapObject(newStooge, function(val, key) {
                     return val + "h";
                }));

                //========================pairs===================
                //将对象【属性名：属性值】放到单独数组
                console.log(_.pairs(newStooge));
                //========================pick===================
                //过滤对象的属性
                //              var newStoogebutton = new Stooge("ailer","20");
                console.log(_.pick(newStooge, 'name', 'age'));
           </script>
     </body>

</html>


_.key _allkeys 

keys和allKeys这两个函数很有对比意义。
前者是该对象的枚举属性，先用默认函数处理，再考虑循环遍历，最后考虑老版本浏览器的时候返回默认属性解决方案。
后者是该对象的枚举属性以及继承的属性，直接进行深度遍历，然后考虑老版本浏览器的时候直接返回默认属性解决方案。

_.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };



nativeKeys = Object.keys

_.has = function(obj, key){
     return obj != null && hasOwnProperty.call(obj, key);
}

delay
_.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };






```