# Vowel Counter - JavaScript Library

A comprehensive JavaScript library for counting, analyzing, and manipulating vowels in strings. This library provides extensive functionality with support for multiple languages, case sensitivity options, and various counting modes.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Advanced Usage](#advanced-usage)
- [Browser Support](#browser-support)
- [Node.js Support](#nodejs-support)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Browser
```html
<script src="Assignment.js"></script>
```

### Node.js
```javascript
const { countVowels, countVowelsMultiple } = require('./Assignment.js');
```

### ES6 Modules
```javascript
import { countVowels, countVowelsMultiple } from './Assignment.js';
```

## Quick Start

```javascript
// Basic vowel counting
const result = countVowels("Hello World");
console.log(result.total); // 3

// Get detailed breakdown
console.log(result.breakdown); // { a: 0, e: 1, i: 0, o: 2, u: 0 }

// Calculate vowel percentage
console.log(result.vowelPercentage); // "18.75"
```

## API Reference

### `countVowels(text, options)`

Counts vowels in a given string with comprehensive analysis.

#### Parameters

- **`text`** (string, required) - The input string to analyze
- **`options`** (object, optional) - Configuration options

#### Options Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `caseSensitive` | boolean | `false` | Treat uppercase and lowercase as different vowels |
| `includeY` | boolean | `false` | Include 'y' as a vowel |
| `includeW` | boolean | `false` | Include 'w' as a vowel |
| `customVowels` | string[] | `[]` | Array of custom characters to treat as vowels |

#### Returns

Returns an object with the following properties:

```javascript
{
  total: number,              // Total number of vowels found
  breakdown: object,          // Count of each vowel type
  text: string,              // Original input text
  options: object,           // Options used for counting
  vowelSet: string[],        // Array of vowels considered
  textLength: number,        // Length of input text
  vowelPercentage: string    // Percentage of vowels in text
}
```

#### Examples

```javascript
// Basic usage
const result = countVowels("Hello World");
// {
//   total: 3,
//   breakdown: { a: 0, e: 1, i: 0, o: 2, u: 0 },
//   text: "Hello World",
//   vowelPercentage: "18.75"
// }

// Case sensitive counting
const caseSensitive = countVowels("Hello World", { caseSensitive: true });
// {
//   total: 3,
//   breakdown: { a: 0, e: 1, i: 0, o: 2, u: 0, A: 0, E: 0, I: 0, O: 0, U: 0 }
// }

// Including 'y' as vowel
const withY = countVowels("Happy Birthday", { includeY: true });
// {
//   total: 4,
//   breakdown: { a: 2, e: 0, i: 0, o: 0, u: 0, y: 2 }
// }

// Custom vowels
const custom = countVowels("Hello World", { customVowels: ['l'] });
// {
//   total: 5,
//   breakdown: { a: 0, e: 1, i: 0, o: 2, u: 0, l: 2 }
// }
```

### `countVowelsMultiple(texts, options)`

Analyzes multiple strings and provides comparative analysis.

#### Parameters

- **`texts`** (string[], required) - Array of strings to analyze
- **`options`** (object, optional) - Same options as `countVowels`

#### Returns

```javascript
{
  results: array,           // Array of individual results for each text
  summary: {
    totalTexts: number,     // Number of texts analyzed
    totalVowels: number,    // Total vowels across all texts
    averageVowels: number,  // Average vowels per text
    textWithMostVowels: object,   // Text with highest vowel count
    textWithLeastVowels: object   // Text with lowest vowel count
  }
}
```

#### Example

```javascript
const texts = ["Hello", "World", "JavaScript", "Programming"];
const result = countVowelsMultiple(texts);
console.log(result.summary);
// {
//   totalTexts: 4,
//   totalVowels: 8,
//   averageVowels: 2,
//   textWithMostVowels: { text: "Programming", total: 3 },
//   textWithLeastVowels: { text: "World", total: 1 }
// }
```

### `findVowelPositions(text, options)`

Finds the positions of all vowels in a string.

#### Parameters

- **`text`** (string, required) - The input string
- **`options`** (object, optional) - Same options as `countVowels`

#### Returns

```javascript
{
  positions: array,         // Array of vowel position objects
  total: number,           // Total number of vowels found
  text: string,            // Original input text
  options: object          // Options used for analysis
}
```

Each position object contains:
```javascript
{
  vowel: string,           // The vowel found
  position: number,        // Position in the string (0-indexed)
  originalChar: string     // Original character at that position
}
```

#### Example

```javascript
const result = findVowelPositions("Hello World");
console.log(result.positions);
// [
//   { vowel: 'e', position: 1, originalChar: 'e' },
//   { vowel: 'o', position: 4, originalChar: 'o' },
//   { vowel: 'o', position: 7, originalChar: 'o' }
// ]
```

### `removeVowels(text, options)`

Removes all vowels from a string.

#### Parameters

- **`text`** (string, required) - The input string
- **`options`** (object, optional) - Same options as `countVowels`

#### Returns

- **`string`** - String with vowels removed

#### Example

```javascript
const result = removeVowels("Hello World");
console.log(result); // "Hll Wrld"

// With custom vowels
const custom = removeVowels("Hello World", { customVowels: ['l'] });
console.log(custom); // "Heo Word"
```

### `replaceVowels(text, replacement, options)`

Replaces vowels in a string with a specified character.

#### Parameters

- **`text`** (string, required) - The input string
- **`replacement`** (string, optional) - Character to replace vowels with (default: '*')
- **`options`** (object, optional) - Same options as `countVowels`

#### Returns

- **`string`** - String with vowels replaced

#### Example

```javascript
const result = replaceVowels("Hello World", "*");
console.log(result); // "H*ll* W*rld"

const result2 = replaceVowels("Hello World", "#");
console.log(result2); // "H#ll# W#rld"
```

## Examples

### Basic Usage

```javascript
// Simple vowel counting
const text = "The quick brown fox jumps over the lazy dog";
const vowels = countVowels(text);
console.log(`Found ${vowels.total} vowels`);
console.log(`Vowel breakdown:`, vowels.breakdown);
```

### Advanced Analysis

```javascript
// Analyze multiple texts with custom options
const texts = [
  "Hello World",
  "JavaScript Programming",
  "Python Development",
  "React Components"
];

const analysis = countVowelsMultiple(texts, {
  caseSensitive: true,
  includeY: true
});

console.log("Analysis Results:");
console.log(`Total texts: ${analysis.summary.totalTexts}`);
console.log(`Average vowels per text: ${analysis.summary.averageVowels}`);
console.log(`Text with most vowels: "${analysis.summary.textWithMostVowels.text}"`);
```

### Text Processing

```javascript
// Remove vowels for text obfuscation
const original = "This is a secret message";
const obfuscated = removeVowels(original);
console.log(`Original: ${original}`);
console.log(`Obfuscated: ${obfuscated}`);

// Replace vowels for censoring
const censored = replaceVowels(original, "*");
console.log(`Censored: ${censored}`);
```

### Position Analysis

```javascript
// Find vowel positions for highlighting
const text = "Highlight vowels in this text";
const positions = findVowelPositions(text);

console.log("Vowel positions:");
positions.positions.forEach(pos => {
  console.log(`'${pos.vowel}' at position ${pos.position}`);
});
```

## Advanced Usage

### Custom Vowel Sets

```javascript
// Define custom vowels for specific languages
const spanishText = "Hola mundo";
const spanishVowels = countVowels(spanishText, {
  customVowels: ['á', 'é', 'í', 'ó', 'ú', 'ñ']
});

// Define custom vowels for technical terms
const technicalText = "API endpoint";
const technicalVowels = countVowels(technicalText, {
  customVowels: ['I', 'O'] // Treat I and O as vowels
});
```

### Batch Processing

```javascript
// Process large arrays of text
const documents = [
  "Document 1 content",
  "Document 2 content",
  "Document 3 content"
];

const batchResults = countVowelsMultiple(documents, {
  caseSensitive: false,
  includeY: true
});

// Filter results
const highVowelDocs = batchResults.results.filter(doc => doc.total > 5);
console.log(`Documents with more than 5 vowels: ${highVowelDocs.length}`);
```

### Error Handling

```javascript
try {
  const result = countVowels("Hello World");
  console.log(result.total);
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Invalid input type:", error.message);
  } else {
    console.error("Unexpected error:", error.message);
  }
}
```

## Browser Support

The library works in all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Node.js Support

- Node.js 12.0+
- CommonJS and ES6 module support
- No external dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Performance Notes

- Time complexity: O(n) where n is the length of the input string
- Space complexity: O(k) where k is the number of unique vowels
- Optimized for large strings and batch processing
- Memory efficient with minimal object creation

## Changelog

### Version 1.0.0
- Initial release
- Basic vowel counting functionality
- Support for case sensitivity
- Custom vowel definitions
- Multiple text analysis
- Position finding
- Vowel removal and replacement
- Comprehensive documentation and examples