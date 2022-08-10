const DetailedLogger = require('../DetailedLogger.js');

function showSampleLogs(loggerImpl) {
    loggerImpl.setLevel('debug');
    if (module.parent == null) {
        loggerImpl.trace('trace');
        loggerImpl.debug('debug');
        loggerImpl.log('log');
        loggerImpl.info('info');
        loggerImpl.warn('warn');
        loggerImpl.error('error');
        loggerImpl.error('error', { number: 42 });
        loggerImpl.error({ number: 42 });
    }
}

showSampleLogs(new DetailedLogger());
