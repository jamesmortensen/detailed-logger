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
            if (i <= currentLogLevel && level !== 'trace')
                logMethods[level] = decorateLogs(console[level])
            else if (level === 'trace')
                logMethods[level] = console[level];
            else
                logMethods[level] = function () { };
        }
    }

    function decorateLogs(legacyFn) {
        const STACK_INDEX = 2;
        const logName = legacyFn.name;
        var filename;
        const cwd = process.cwd();
        const runExperimentalAsyncIfEnabled = getExperimentalAsyncIfEnabledFn();
        const wrapWithColor = getWrapWithColorFn(logName);
        return function () {
            var stack = new Error().stack.toString();
            runExperimentalAsyncIfEnabled(() => {
                var args = arguments;
               
                var traceInfoArr = stack.split('\n')[STACK_INDEX].match('([^/]+):(.+?):');
                var lineNumber = traceInfoArr[2];
                filename = traceInfoArr[1];
                
                if (typeof (args[0]) === 'object') {
                    legacyFn.apply(this, [wrapWithColor(logName, '' + filename + ':' + lineNumber + ': <' + logName + '> OBJECT BEGIN >>>')]);
                    console[logName](args[0]);
                    legacyFn.apply(this, [wrapWithColor(logName, '' + filename + ':' + lineNumber + ': <' + logName + '> <<< OBJECT END')]);
                } else {
                    args[0] = wrapWithColor(logName, '' + filename + ':' + lineNumber + ': <' + logName + '>: ' + args[0]);
                    legacyFn.apply(this, args);
                }
            });
        };
    };

    // NOTE: It might actually be faster _without_ DETAILED_LOGGER_ASYNC!
    function getExperimentalAsyncIfEnabledFn() {
        if(process.env.DETAILED_LOGGER_ASYNC === 'true')
            return function(fn) { setTimeout(fn, 0); }
        else
            return function(fn) { fn(); }
    }

    function getWrapWithColorFn(logName, logMsg) {
        let colorWrapTempl = getColorWrap(logName);
        return function(logName, logMsg) {
            const logOutput = colorWrapTempl.replace('<EOF>', logMsg);
            return logOutput;
        }
    }

    function getColorWrap(logName) {
        const fgRed = "\x1b[31m";
        const fgGreen = "\x1b[32m";
        const fgYellow = "\x1b[33m";
        const fgBlue = "\x1b[34m";
        const fgMagenta = "\x1b[35m";
        const fgBlack = "\x1b[0m";

        let colorWrap;

        switch (logName) {
            case 'debug':
                colorWrap = fgBlue + '<EOF>' + fgBlack;
                break;
            case 'log':
                colorWrap = fgMagenta + '<EOF>' + fgBlack;
                break;
            case 'info':
                colorWrap = fgGreen + '<EOF>' + fgBlack;
                break;
            case 'warn':
                colorWrap = fgYellow + '<EOF>' + fgBlack;
                break;
            case 'error':
                colorWrap = fgRed + '<EOF>' + fgBlack;
                break;
        }
        return colorWrap;
    }

    return {
        decorateLogs,
        redefineLogMethods
    };
})();

module.exports = DetailedLogger;
