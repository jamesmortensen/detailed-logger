const { expect } = require('chai');

function setupBindConsoleLogFn() {
    const origErrorFn = console.info.bind(console);
    const infos = [];
    console.info = (...args) => infos.push(...args);
    console.info = origErrorFn;
    // console.info('name = ' + console.info.name);
}

function executeTest() {
    const DetailedLogger = require('../DetailedLogger.js');
    const logger = new DetailedLogger();
    logger.info('infos');
}

setupBindConsoleLogFn();
expect(console.info.name).to.equal('bound info');

executeTest();

console.log('test completed!');

