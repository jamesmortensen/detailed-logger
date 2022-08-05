# detailed-logger

DetailedLogger logs the console methods to the terminal and color codes them. Most importantly, the filename and line number is included for faster debugging.

```
var DetailedLogger = require('detailed-logger');
var logger = new DetailedLogger();

logger.trace('trace');
logger.debug('debug');
logger.log('log');
logger.info('info');
logger.warn('warn');
logger.error('error');
```

<img width="384" alt="Screenshot 2022-08-05 at 7 55 09 AM" src="https://user-images.githubusercontent.com/1315816/182988479-509d1583-0ae2-498b-8033-f349fe7d352a.png">


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

## License

Copyright (c) James Mortensen, 2021-2022 MIT License
