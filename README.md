
### safeSet(obj,path,value)
> set the value by the path in obj , if can not set value in obj through path, will auto create {} or []

### Install
```
npm install l-safeSet -S
```
### Usage
```js

var safeget = require("safeget");

// when the path can not set value, will create {} (or [])
safeSet({ b: 1 }, 'b.1', 2) 
// the same as 
safeSet({ b: 1 }, ['b',1], 2)


// will create [],if path match [num]
safeSet({ b: 1 }, 'b[1]', 2)  => // { b: [, 2] }
// the same as 
safeSet({ b: 1 }, ['b','[1]'], 2)
```