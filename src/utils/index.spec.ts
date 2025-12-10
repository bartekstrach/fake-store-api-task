import { simpleFuncToConfirmVitestConfig } from '.';

describe('utils', () => {
    it('returns "true"', () => {
        expect(simpleFuncToConfirmVitestConfig()).toBe(true);
    });
});
