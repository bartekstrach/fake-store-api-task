export const capitalizeWord = (word: string = ''): string => {
    const trimmed = word.trim();

    if (trimmed.length === 0) {
        return word;
    }

    return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
};
