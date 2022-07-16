/**
 * DetailedLogger adds the filename, line number, and the log level
 * of each log statement to the terminal.
 */

class DetailedLogger {

    ERROR = 0;
    WARN = 1;
    INFO = 2;
    LOG = 3;
    DEBUG = 4;
    TRACE = 5;

    constructor() {
        var currentLogLevel = this.INFO;
        this.setLevel(currentLogLevel);
    }

    setLevel(currentLogLevel) {
        logDecorator.redefineLogMethods(this, currentLogLevel);
    }
}

const logDecorator = new (function LogDecorator() {

    function redefineLogMethods(logMethods, currentLogLevel) {
        this.levels = ['error', 'warn', 'info', 'log', 'debug', 'trace'];
        currentLogLevel = typeof currentLogLevel === 'string'
            ? this.levels.indexOf(currentLogLevel)
            : currentLogLevel;
        for (var i = 0; i < this.levels.length; i++) {
            var level = this.levels[i];
            if(i <= currentLogLevel && level !== 'trace')
                logMethods[level] = logDecorator.decorateLogs(console[level])
            else if(level === 'trace')
                logMethods[level] = console[level];
            else
                logMethods[level] = function () { };
        }
    }

    function decorateLogs(legacyFn) {
        const STACK_INDEX = 2;
        var logName;
        var filename;
        var cwd = process.cwd();
        return function () {
            var stack = new Error().stack.toString();
            setTimeout(() => {    
                var args = arguments;
                var traceInfoArr = stack.split('\n')[STACK_INDEX].match('\\((.*):(.*):');
                var lineNumber = traceInfoArr[2];
                if (logName === undefined) {
                    var retrievedLogName = stack.split('\n')[1].match('\\.(.*)\\s')[1];
                    logName = addColorToLogLevel(retrievedLogName);
                }
                if (filename === undefined) {
                    filename = traceInfoArr[1].toString().replace(cwd + '/', '');
                }
                args[0] = '(' + filename + '):' + lineNumber + ': ' + logName + ': ' + args[0];
                legacyFn.apply(this, args);
            }, 0);
        };
    };

    function addColorToLogLevel(logName) {
        var fgRed = "\x1b[31m";
        var fgGreen = "\x1b[32m";
        var fgYellow = "\x1b[33m";
        var fgBlue = "\x1b[34m";
        var fgMagenta = "\x1b[35m";
        var fgBlack = "\x1b[0m";

        switch (logName) {
            case 'debug':
                logName = fgBlue + logName + fgBlack;
                break;
            case 'log':
                logName = fgMagenta + logName + fgBlack;
                break;
            case 'info':
                logName = fgGreen + logName + fgBlack;
                break;
            case 'warn':
                logName = fgYellow + logName + fgBlack;
                break;
            case 'error':
                logName = fgRed + logName + fgBlack;
                break;
        }
        return logName;
    }

    return {
        decorateLogs: decorateLogs,
        redefineLogMethods: redefineLogMethods
    };
})();

module.exports = DetailedLogger;
