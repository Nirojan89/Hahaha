/**
 * Vowel Counter - JavaScript Library
 * 
 * This library provides comprehensive functionality for counting vowels in strings.
 * It supports multiple languages, case sensitivity options, and various counting modes.
 * 
 * @author Your Name
 * @version 1.0.0
 * @license MIT
 */

/**
 * Counts vowels in a given string.
 * 
 * @description
 * This function analyzes a string and returns the count of vowels (a, e, i, o, u).
 * It supports both uppercase and lowercase vowels by default, and can be configured
 * for case-sensitive counting.
 * 
 * @param {string} text - The input string to analyze
 * @param {Object} options - Configuration options for vowel counting
 * @param {boolean} options.caseSensitive - If true, treats uppercase and lowercase as different vowels (default: false)
 * @param {boolean} options.includeY - If true, includes 'y' as a vowel (default: false)
 * @param {boolean} options.includeW - If true, includes 'w' as a vowel (default: false)
 * @param {string[]} options.customVowels - Array of custom characters to treat as vowels
 * @returns {Object} Object containing vowel count information
 * 
 * @example
 * // Basic usage
 * const result = countVowels("Hello World");
 * console.log(result.total); // 3
 * 
 * @example
 * // Case sensitive counting
 * const result = countVowels("Hello World", { caseSensitive: true });
 * console.log(result.breakdown); // { a: 0, e: 1, i: 0, o: 2, u: 0, A: 0, E: 0, I: 0, O: 0, U: 0 }
 * 
 * @example
 * // Including 'y' as vowel
 * const result = countVowels("Happy Birthday", { includeY: true });
 * console.log(result.total); // 4 (a, i, y, a)
 * 
 * @example
 * // Custom vowels
 * const result = countVowels("Hello World", { customVowels: ['l'] });
 * console.log(result.total); // 5 (e, o, o, l, l)
 * 
 * @throws {TypeError} When text parameter is not a string
 * @throws {Error} When options parameter is not an object (if provided)
 */
function countVowels(text, options = {}) {
    // Input validation
    if (typeof text !== 'string') {
        throw new TypeError('Text parameter must be a string');
    }
    
    if (options !== null && typeof options !== 'object') {
        throw new Error('Options parameter must be an object');
    }
    
    // Default options
    const {
        caseSensitive = false,
        includeY = false,
        includeW = false,
        customVowels = []
    } = options;
    
    // Define vowel sets
    const standardVowels = ['a', 'e', 'i', 'o', 'u'];
    const extendedVowels = includeY ? [...standardVowels, 'y'] : standardVowels;
    const finalVowels = includeW ? [...extendedVowels, 'w'] : extendedVowels;
    
    // Add custom vowels
    const allVowels = [...new Set([...finalVowels, ...customVowels])];
    
    // Convert to uppercase if case insensitive
    const processedText = caseSensitive ? text : text.toLowerCase();
    const vowelsToCheck = caseSensitive ? 
        [...allVowels, ...allVowels.map(v => v.toUpperCase())] : 
        allVowels;
    
    // Initialize counters
    const breakdown = {};
    vowelsToCheck.forEach(vowel => {
        breakdown[vowel] = 0;
    });
    
    // Count vowels
    let total = 0;
    for (const char of processedText) {
        if (vowelsToCheck.includes(char)) {
            breakdown[char]++;
            total++;
        }
    }
    
    // Return comprehensive result
    return {
        total,
        breakdown,
        text: text,
        options: {
            caseSensitive,
            includeY,
            includeW,
            customVowels
        },
        vowelSet: allVowels,
        textLength: text.length,
        vowelPercentage: text.length > 0 ? ((total / text.length) * 100).toFixed(2) : 0
    };
}

/**
 * Counts vowels in multiple strings and provides comparative analysis.
 * 
 * @param {string[]} texts - Array of strings to analyze
 * @param {Object} options - Configuration options (same as countVowels)
 * @returns {Object} Comparative analysis of all texts
 * 
 * @example
 * const texts = ["Hello", "World", "JavaScript"];
 * const result = countVowelsMultiple(texts);
 * console.log(result.comparison);
 */
function countVowelsMultiple(texts, options = {}) {
    if (!Array.isArray(texts)) {
        throw new TypeError('Texts parameter must be an array');
    }
    
    const results = texts.map((text, index) => ({
        index,
        text,
        ...countVowels(text, options)
    }));
    
    const totalVowels = results.reduce((sum, result) => sum + result.total, 0);
    const avgVowels = results.length > 0 ? totalVowels / results.length : 0;
    
    return {
        results,
        summary: {
            totalTexts: texts.length,
            totalVowels,
            averageVowels: avgVowels,
            textWithMostVowels: results.reduce((max, current) => 
                current.total > max.total ? current : max
            ),
            textWithLeastVowels: results.reduce((min, current) => 
                current.total < min.total ? min : current
            )
        }
    };
}

/**
 * Finds all vowel positions in a string.
 * 
 * @param {string} text - The input string
 * @param {Object} options - Configuration options
 * @returns {Object} Object containing vowel positions and details
 * 
 * @example
 * const result = findVowelPositions("Hello World");
 * console.log(result.positions); // [{vowel: 'e', position: 1}, {vowel: 'o', position: 4}, {vowel: 'o', position: 7}]
 */
function findVowelPositions(text, options = {}) {
    const vowelCount = countVowels(text, options);
    const positions = [];
    
    const processedText = options.caseSensitive ? text : text.toLowerCase();
    const vowelsToCheck = options.caseSensitive ? 
        [...vowelCount.vowelSet, ...vowelCount.vowelSet.map(v => v.toUpperCase())] : 
        vowelCount.vowelSet;
    
    for (let i = 0; i < processedText.length; i++) {
        const char = processedText[i];
        if (vowelsToCheck.includes(char)) {
            positions.push({
                vowel: char,
                position: i,
                originalChar: text[i]
            });
        }
    }
    
    return {
        positions,
        total: positions.length,
        text: text,
        options: vowelCount.options
    };
}

/**
 * Removes all vowels from a string.
 * 
 * @param {string} text - The input string
 * @param {Object} options - Configuration options
 * @returns {string} String with vowels removed
 * 
 * @example
 * const result = removeVowels("Hello World");
 * console.log(result); // "Hll Wrld"
 */
function removeVowels(text, options = {}) {
    const vowelCount = countVowels(text, options);
    const vowelsToRemove = options.caseSensitive ? 
        [...vowelCount.vowelSet, ...vowelCount.vowelSet.map(v => v.toUpperCase())] : 
        vowelCount.vowelSet;
    
    return text.split('').filter(char => !vowelsToRemove.includes(char)).join('');
}

/**
 * Replaces vowels in a string with a specified character.
 * 
 * @param {string} text - The input string
 * @param {string} replacement - Character to replace vowels with
 * @param {Object} options - Configuration options
 * @returns {string} String with vowels replaced
 * 
 * @example
 * const result = replaceVowels("Hello World", "*");
 * console.log(result); // "H*ll* W*rld"
 */
function replaceVowels(text, replacement = '*', options = {}) {
    const vowelCount = countVowels(text, options);
    const vowelsToReplace = options.caseSensitive ? 
        [...vowelCount.vowelSet, ...vowelCount.vowelSet.map(v => v.toUpperCase())] : 
        vowelCount.vowelSet;
    
    return text.split('').map(char => 
        vowelsToReplace.includes(char) ? replacement : char
    ).join('');
}

// Export functions for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        countVowels,
        countVowelsMultiple,
        findVowelPositions,
        removeVowels,
        replaceVowels
    };
}

// Example usage and testing
if (typeof window !== 'undefined') {
    // Browser environment - attach to window
    window.VowelCounter = {
        countVowels,
        countVowelsMultiple,
        findVowelPositions,
        removeVowels,
        replaceVowels
    };
}

// Demo function to showcase all features
function demonstrateVowelCounter() {
    console.log("=== Vowel Counter Demo ===\n");
    
    const testText = "Hello World! This is a JavaScript vowel counter.";
    
    // Basic usage
    console.log("1. Basic vowel counting:");
    console.log(`Text: "${testText}"`);
    const basic = countVowels(testText);
    console.log(`Total vowels: ${basic.total}`);
    console.log(`Vowel breakdown:`, basic.breakdown);
    console.log(`Vowel percentage: ${basic.vowelPercentage}%\n`);
    
    // Case sensitive
    console.log("2. Case sensitive counting:");
    const caseSensitive = countVowels(testText, { caseSensitive: true });
    console.log(`Case sensitive vowels:`, caseSensitive.breakdown);
    console.log(`Total: ${caseSensitive.total}\n`);
    
    // Including Y as vowel
    console.log("3. Including 'Y' as vowel:");
    const withY = countVowels("Happy Birthday", { includeY: true });
    console.log(`Text: "Happy Birthday"`);
    console.log(`Vowels (including Y): ${withY.total}`);
    console.log(`Breakdown:`, withY.breakdown);
    console.log();
    
    // Multiple texts
    console.log("4. Multiple text analysis:");
    const multiple = countVowelsMultiple(["Hello", "World", "JavaScript", "Programming"]);
    console.log(`Summary:`, multiple.summary);
    console.log();
    
    // Vowel positions
    console.log("5. Finding vowel positions:");
    const positions = findVowelPositions("Hello World");
    console.log(`Vowel positions:`, positions.positions);
    console.log();
    
    // Remove vowels
    console.log("6. Removing vowels:");
    const withoutVowels = removeVowels("Hello World");
    console.log(`Original: "Hello World"`);
    console.log(`Without vowels: "${withoutVowels}"`);
    console.log();
    
    // Replace vowels
    console.log("7. Replacing vowels:");
    const replaced = replaceVowels("Hello World", "*");
    console.log(`Original: "Hello World"`);
    console.log(`Replaced: "${replaced}"`);
    console.log();
    
    console.log("=== Demo Complete ===");
}

// Run demo if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    demonstrateVowelCounter();
}
