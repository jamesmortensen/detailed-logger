const { expect } = require('chai');

const execute = require('executely').execute;
const USE_EXECFILE = true;

describe('Test console bind - fibers.js issue', () => {
    it('should be able to log messages even if console logs are bound', async () => {
        const cmd = `node ./test/console-bind.helper.js`;
        let consolidated = { output: '' };

        await execute(cmd, USE_EXECFILE, validateExpects(consolidated, () => {
            expect(consolidated.output).to.contain('<info>: infos');
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
});

