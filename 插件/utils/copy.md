- 复制文件

```js
copyContent: function (content) {
  const tmp = document.createElement("span");
  tmp.innerText = content;
  document.body.appendChild(tmp);
  let range = document.createRange();
  range.selectNode(tmp);
  let selection = window.getSelection();
  if (selection.rangeCount > 0) {
      selection.removeAllRanges();
  }
  selection.addRange(range);
  document.execCommand("copy");
  document.body.removeChild(tmp);
  layer.msg('复制成功')
},
```