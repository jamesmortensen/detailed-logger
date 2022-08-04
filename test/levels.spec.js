const { expect } = require('chai');
const execute = require('executely').execute;
const USE_EXECFILE = true;

describe('Log Level Tests', () => {

    const log_messages_helpers = {
        esm: 'log-messages.helper.mjs',
        commonjs: 'log-messages.helper.js'
    };

    Object.entries(log_messages_helpers).forEach(function ([moduleType, log_message_helper]) {
        console.log(`Run tests for ${moduleType} using ${log_message_helper}`);

        it(moduleType + ' - should output all log messages when set to trace', async () => {
            const cmd = `node ./test/${log_message_helper} trace`;
            let consolidated = { output: '' };

            await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
                //expect(consolidated.output).to.contain('trace');
                expect(consolidated.output).to.contain('<debug>: debug');
                expect(consolidated.output).to.contain('<log>: log');
                expect(consolidated.output).to.contain('<info>: info');
                //expect(consolidatedOutput).to.contain('<warn>: warn');
                //expect(consolidatedOutput).to.contain('<error>: error');
            }));
        });

        it(moduleType + ' - should output everything except trace when set to debug', async () => {
            const cmd = `node ./test/${log_message_helper} debug`;
            let consolidated = { output: '' };

            await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
                expect(consolidated.output).to.contain('<debug>: debug');
                expect(consolidated.output).to.contain('<log>: log');
                expect(consolidated.output).to.contain('<info>: info');
            }));
        });

        it(moduleType + ' - should not output debug when set to log', async () => {
            const cmd = `node ./test/${log_message_helper} log`;
            let consolidated = { output: '' };

            await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
                expect(consolidated.output).to.not.contain('<debug>: debug');
                expect(consolidated.output).to.contain('<log>: log');
                expect(consolidated.output).to.contain('<info>: info');
            }));
        });

        it(moduleType + ' - should not output debug or log when set to info', async () => {
            const cmd = `node ./test/${log_message_helper} info`;
            let consolidated = { output: '' };

            await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
                expect(consolidated.output).to.not.contain('<debug>: debug');
                expect(consolidated.output).to.not.contain('<log>: log');
                expect(consolidated.output).to.contain('<info>: info');
            }));
        });

        it(moduleType + ' - should not output debug, log, or info when set to warn', async () => {
            const cmd = `node ./test/${log_message_helper} warn`;
            let consolidated = { output: '' };

            await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
                expect(consolidated.output).to.not.contain('<debug>: debug');
                expect(consolidated.output).to.not.contain('<log>: log');
                expect(consolidated.output).to.not.contain('<info>: info');
            }));
        });
    });


    function validateExpects(consolidated, expectFn) {
        return function (output, process, resolve, reject) {
            process.disableOutput = true;
            consolidated.output += output;
            if (output.includes('test completed!')) {
                expectFn();
            }
        }
    }
})
