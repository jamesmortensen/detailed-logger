const { expect } = require('chai');
const execute = require('executely').execute;
const USE_EXECFILE = true;

describe('Log Level Tests', () => {

    it('should output all log messages when set to trace', async () => {
        const cmd = `node ./test/log-messages.helper.js trace`;
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

    it('should output everything except trace when set to debug', async () => {
        const cmd = `node ./test/log-messages.helper.js debug`;
        let consolidated = { output: '' };

        await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
            expect(consolidated.output).to.contain('<debug>: debug');
            expect(consolidated.output).to.contain('<log>: log');
            expect(consolidated.output).to.contain('<info>: info');
        }));
    });

    it('should not output debug when set to log', async () => {
        const cmd = `node ./test/log-messages.helper.js log`;
        let consolidated = { output: '' };

        await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
            expect(consolidated.output).to.not.contain('<debug>: debug');
            expect(consolidated.output).to.contain('<log>: log');
            expect(consolidated.output).to.contain('<info>: info');
        }));
    });

    it('should not output debug or log when set to info', async () => {
        const cmd = `node ./test/log-messages.helper.js info`;
        let consolidated = { output: '' };

        await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
            expect(consolidated.output).to.not.contain('<debug>: debug');
            expect(consolidated.output).to.not.contain('<log>: log');
            expect(consolidated.output).to.contain('<info>: info');
        }));
    });

    it('should not output debug, log, or info when set to warn', async () => {
        const cmd = `node ./test/log-messages.helper.js warn`;
        let consolidated = { output: '' };

        await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
            expect(consolidated.output).to.not.contain('<debug>: debug');
            expect(consolidated.output).to.not.contain('<log>: log');
            expect(consolidated.output).to.not.contain('<info>: info');
        }));
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
