Determines if runtime is `iojs` or not. 

There are two logics:

1.Based on `process.version` (default logic):

```js
var isIojs = require('is-iojs');

if (isIojs()) { /* runtime is iojs */ } else { /* runtime is node */ }
```

2.Based on result of `node -h` help message (more reliable logic):

```js
var isIojs = require('is-iojs').reliable();

if (isIojs()) { /* runtime is iojs */ } else { /* runtime is node */ } 
```
