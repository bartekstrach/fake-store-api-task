import { normalizePath } from './url';

type TestCase = {
    description: string;
    input: string;
    expected: string;
};

describe('normalizePath', () => {
    const testCases: TestCase[] = [
        {
            description: 'returns full URL unchanged',
            input: 'https://example.com/path',
            expected: 'https://example.com/path',
        },
        {
            description: 'returns full URL with query params unchanged',
            input: 'http://example.com/path?query=1#hash',
            expected: 'http://example.com/path?query=1#hash',
        },
        {
            description: 'trims spaces and keeps leading slash',
            input: '   /path  ',
            expected: '/path',
        },
        {
            description: 'removes multiple leading slashes and adds one slash',
            input: '///path/to/resource',
            expected: '/path/to/resource',
        },
        {
            description: 'returns root slash for input "/"',
            input: '/',
            expected: '/',
        },
        {
            description: 'returns root slash for empty input',
            input: '',
            expected: '/',
        },
        {
            description: 'removes leading spaces and slashes',
            input: '  ///multiple/slashes/and/spaces  ',
            expected: '/multiple/slashes/and/spaces',
        },
        {
            description: 'returns path with no leading slash by adding one',
            input: 'no-leading-slash',
            expected: '/no-leading-slash',
        },
        {
            description: 'handles unusual URL schemes',
            input: 'ftp://example.com/resource',
            expected: 'ftp://example.com/resource',
        },
        {
            description: 'handles URL with port',
            input: 'http://localhost:3000/path',
            expected: 'http://localhost:3000/path',
        },
        {
            description: 'does not modify path if already normalized',
            input: '/already-normalized/path',
            expected: '/already-normalized/path',
        },
    ];

    it.each(testCases)('$description', ({ input, expected }) => {
        const normalized = normalizePath(input);
        expect(normalized).toBe(expected);
    });
});
