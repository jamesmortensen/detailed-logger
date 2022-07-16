DetailedLogger logs the console methods to the terminal and color codes them. Most importantly, the filename and line number is included for faster debugging.

```
var DetailedLogger = require('./DetailedLogger.js');
var logger = new DetailedLogger();

logger.trace('trace');
logger.debug('debug');
logger.log('log');
logger.info('info');
logger.warn('warn');
logger.error('error');
```

Trace is at the highest log level and error is at the lowest.  Use setLevel to adjust logging detail.

```
logger.setLevel('trace');  // all log messages are emitted
```

For less detail:

```
logger.setLevel('warn');  // only warn and error messages are emitted
```

For info, warn, and error:

```
logger.setLevel('info');
```

Note that 'info' is the default.

Run the examples in the examples folder for more in-depth understanding.
