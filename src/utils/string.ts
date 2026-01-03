/**
 * Capitalizes a single word by:
 * - trimming leading and trailing whitespace
 * - converting the first character to uppercase
 * - converting the rest of the characters to lowercase
 *
 * Returns the original input if the trimmed word is empty.
 *
 * Examples:
 *  - 'hello' => 'Hello'
 *  - ' wORLD ' => 'World'
 *  - '' => ''
 *
 * @param {string} word - input word to capitalize
 *
 * @returns {string} the capitalized word
 */
export const capitalizeWord = (word: string = ''): string => {
    const trimmed = word.trim();

    if (trimmed.length === 0) {
        return word;
    }

    return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
};
