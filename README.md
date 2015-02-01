Determines if runtime is iojs or not. 

There are two logics:

1. Based on `process.version`:

```js
var isIojs = require('is-iojs');

if (isIojs()) { /* runtime is iojs */ } else { /* runtime is node */ }
```

2. Based on result of `node -h` help message:

```js
var isIo = require('is-iojs').safe(); // safe determination, based on result of `node -h` help message

if (isIojs()) { /* runtime is iojs */ } else { /* runtime is node */ } 
```
