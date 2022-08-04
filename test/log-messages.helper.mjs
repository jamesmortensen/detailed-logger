
if(!process.argv[2].match('trace|log|debug|info|warn|error'))
  throw new Error('not a valid logLevel.');

const logLevel = process.argv[2];

import DetailedLogger from '../DetailedLogger.js';
const logger = new DetailedLogger();

logger.setLevel(logLevel);

console.log('level set to ' + logLevel);

logger.trace('trace');
logger.log('log');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
console.log('test completed!');

