var DetailedLogger = require('../DetailedLogger.js');
var logger = new DetailedLogger();

logger.trace('trace');
logger.log('log');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
logger.error('default - should only see info, warn, error above');

logger.setLevel('info');
logger.trace('trace');
logger.log('log');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
logger.error('should only see info, warn, error above');

logger.setLevel('debug');
logger.trace('trace');
logger.log('log');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
logger.error('should only see log, debug, info, warn, error above');

logger.setLevel('error');
logger.trace('trace');
logger.log('log');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
logger.error('should only see error above');