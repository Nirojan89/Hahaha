/**
 * Counts the number of vowels in a given string
 * @param {string} str - The input string to count vowels from
 * @returns {number} - The count of vowels in the string
 */
function countVowels(str) {
    // Convert string to lowercase and use regex to match vowels
    const vowels = str.toLowerCase().match(/[aeiou]/g);
    
    // Return the count of vowels, or 0 if no vowels found
    return vowels ? vowels.length : 0;
}

/**
 * Alternative implementation using a more explicit approach
 * @param {string} str - The input string to count vowels from
 * @returns {number} - The count of vowels in the string
 */
function countVowelsAlternative(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    
    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    
    return count;
}

// Example usage and testing
console.log("=== Vowel Count Examples ===");

const testStrings = [
    "Hello World",
    "JavaScript is awesome",
    "AEIOU",
    "bcdfghjklmnpqrstvwxyz",
    "The quick brown fox jumps over the lazy dog",
    "Programming",
    ""
];

testStrings.forEach(str => {
    const count1 = countVowels(str);
    const count2 = countVowelsAlternative(str);
    console.log(`"${str}" - Vowels: ${count1} (both methods agree: ${count1 === count2})`);
});

// Interactive function for user input
function interactiveVowelCount() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Enter a string to count vowels: ', (input) => {
        const vowelCount = countVowels(input);
        console.log(`The string "${input}" contains ${vowelCount} vowel(s).`);
        rl.close();
    });
}

// Uncomment the line below to run interactive mode
// interactiveVowelCount();

module.exports = { countVowels, countVowelsAlternative };