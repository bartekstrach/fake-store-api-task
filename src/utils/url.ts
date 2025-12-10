/**
 * Normalizes a given path string by:
 * - If the input is a valid full URL, returns the URL string as-is.
 * - Otherwise, trims leading and trailing whitespace,
 *   removes any leading forward slashes,
 *   and ensures the path starts with a single leading slash.
 *
 * Examples:
 *  - 'https://example.com/path' => 'https://example.com/path'
 *  - '  /some/path  ' => '/some/path'
 *  - '///multiple/slashes' => '/multiple/slashes'
 *  - 'no-leading-slash' => '/no-leading-slash'
 *
 * @param {string} path - input path or URL string to normalize.
 * @returns {string} the normalized path or URL string.
 */
export const normalizePath = (path: string): string => {
    try {
        const url = new URL(path);
        return url.toString();
    } catch {
        // Not a full URL - keep normalizing
    }

    // Remove leading and trailing whitespaces
    const trimmedPath = path.trim();

    // Remove leading forward slashes
    const normalizedPath = trimmedPath.replace(/^\/+/, '');

    return `/${normalizedPath}`;
};
