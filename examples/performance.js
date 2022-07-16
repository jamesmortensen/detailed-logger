// performance against loglevel module.

var DetailedLogger = require('../DetailedLogger.js');
var logger = new DetailedLogger();
logger.setLevel('trace');
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');


var N = 10000;
var start2 = new Date().getTime();
for (var i = 0; i < N; i++) {
    logger.warn(i);
}
var detailedLogTime = new Date().getTime() - start2;

// loglevel is faster, but no filename or linenumber is included.
var logLevel = require('loglevel');
var start = new Date().getTime();
for (var i = 0; i < N; i++) {
    logLevel.warn(i);
}
var logLevelTime = new Date().getTime() - start;

setTimeout(function () {
    console.log('start = ' + start)
    console.log('time for logLevel    = ' + logLevelTime);
    console.log('start2 = ' + start2)
    console.log('time for DetailedLog = ' + detailedLogTime);
}, 2000);