import { capitalizeWord } from './string';

type TestCase = {
    description: string;
    input: string;
    expected: string;
};

describe('capitalizeWord', () => {
    const testCases: TestCase[] = [
        { description: 'basic lowercase word', input: 'hello', expected: 'Hello' },
        { description: 'Leading spaces', input: ' HELLO', expected: 'Hello' },
        {
            description: 'multiple words, second stays lowercase',
            input: 'hello world',
            expected: 'Hello world',
        },
        { description: 'mixed case with spaces', input: ' HeLLo ', expected: 'Hello' },
        { description: 'empty string', input: '', expected: '' },
        { description: 'string with only spaces', input: '  ', expected: '  ' },
        { description: 'single character word', input: 'H', expected: 'H' },
        { description: 'single lowercase character', input: 'a', expected: 'A' },
        { description: 'single uppercase character', input: 'A', expected: 'A' },
        { description: 'leading spaces', input: '  Leading spaces', expected: 'Leading spaces' },
        { description: 'trailing spaces', input: 'trailing spaces  ', expected: 'Trailing spaces' },
        {
            description: 'Mixed case with proper result',
            input: 'mIXed cASE',
            expected: 'Mixed case',
        },
        { description: 'long string with space', input: 'a' + ' '.repeat(1000), expected: 'A' },
    ];

    it.each(testCases)('capitalizes $input - $description', ({ input, expected }) => {
        const result = capitalizeWord(input);
        expect(result).toBe(expected);
    });
});
