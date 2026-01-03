/**
 * Normalizes a given path string by:
 * - If the input is a valid full URL, returns the URL string as-is.
 * - Otherwise:
 *   - trims leading and trailing whitespace,
 *   - ensures the path starts with a single leading slash,
 *   - removes duplicate slashes (except after protocol).
 *
 * Examples:
 *  - 'https://example.com/path' => 'https://example.com/path'
 *  - '  /some/path  ' => '/some/path'
 *  - '///multiple/leading/slashes' => '/multiple/leading/slashes'
 *  - 'no-leading-slash' => '/no-leading-slash'
 *  - '/duplicate//slashes/' => '/duplicate/slashes'
 *
 * @param {string} path - input path or URL string to normalize.
 * @returns {string} the normalized path or URL string.
 */
export const normalizePath = (path: string): string => {
    // Remove leading and trailing whitespaces
    const trimmed = path.trim();

    // Remove duplicate slashes (except after protocol)
    const dedupe = (s: string) => s.replace(/\/+/g, '/');

    try {
        const url = new URL(trimmed);
        url.pathname = dedupe(url.pathname);
        return url.toString();
    } catch {
        // Not a full URL - keep normalizing
    }

    let normalized = dedupe(trimmed);

    // Ensure starts with single slash
    if (!normalized.startsWith('/')) {
        normalized = `/${normalized}`;
    }

    return normalized;
};
