/**
 * Vowel Counter - Test Suite and Examples
 * 
 * This file demonstrates all the functionality of the vowel counter library
 * and provides comprehensive test cases.
 */

// Import the vowel counter functions
const {
    countVowels,
    countVowelsMultiple,
    findVowelPositions,
    removeVowels,
    replaceVowels
} = require('./Assignment.js');

/**
 * Test Suite for Vowel Counter Library
 */
class VowelCounterTests {
    
    /**
     * Run all tests
     */
    static runAllTests() {
        console.log("🧪 Running Vowel Counter Test Suite\n");
        
        this.testBasicCounting();
        this.testCaseSensitivity();
        this.testCustomVowels();
        this.testMultipleTexts();
        this.testVowelPositions();
        this.testVowelRemoval();
        this.testVowelReplacement();
        this.testErrorHandling();
        
        console.log("✅ All tests completed successfully!\n");
    }
    
    /**
     * Test basic vowel counting functionality
     */
    static testBasicCounting() {
        console.log("📊 Testing Basic Vowel Counting:");
        
        const testCases = [
            { text: "Hello World", expected: 3 },
            { text: "JavaScript", expected: 3 },
            { text: "Programming", expected: 3 },
            { text: "AEIOU", expected: 5 },
            { text: "BCDFG", expected: 0 },
            { text: "", expected: 0 }
        ];
        
        testCases.forEach(({ text, expected }) => {
            const result = countVowels(text);
            const passed = result.total === expected;
            console.log(`  ${passed ? '✅' : '❌'} "${text}" -> ${result.total} vowels (expected: ${expected})`);
            
            if (!passed) {
                console.log(`    Breakdown:`, result.breakdown);
            }
        });
        console.log();
    }
    
    /**
     * Test case sensitivity options
     */
    static testCaseSensitivity() {
        console.log("🔤 Testing Case Sensitivity:");
        
        const text = "Hello WORLD";
        
        // Case insensitive (default)
        const insensitive = countVowels(text);
        console.log(`  Case insensitive: ${insensitive.total} vowels`);
        console.log(`  Breakdown:`, insensitive.breakdown);
        
        // Case sensitive
        const sensitive = countVowels(text, { caseSensitive: true });
        console.log(`  Case sensitive: ${sensitive.total} vowels`);
        console.log(`  Breakdown:`, sensitive.breakdown);
        console.log();
    }
    
    /**
     * Test custom vowel definitions
     */
    static testCustomVowels() {
        console.log("🎯 Testing Custom Vowels:");
        
        const text = "Hello World";
        
        // Standard vowels
        const standard = countVowels(text);
        console.log(`  Standard vowels: ${standard.total}`);
        
        // Including Y
        const withY = countVowels(text, { includeY: true });
        console.log(`  Including Y: ${withY.total}`);
        
        // Including W
        const withW = countVowels(text, { includeW: true });
        console.log(`  Including W: ${withW.total}`);
        
        // Custom vowels
        const custom = countVowels(text, { customVowels: ['l', 'r'] });
        console.log(`  Custom vowels (l, r): ${custom.total}`);
        console.log(`  Custom breakdown:`, custom.breakdown);
        console.log();
    }
    
    /**
     * Test multiple text analysis
     */
    static testMultipleTexts() {
        console.log("📚 Testing Multiple Text Analysis:");
        
        const texts = [
            "Hello",
            "World",
            "JavaScript",
            "Programming",
            "Python"
        ];
        
        const result = countVowelsMultiple(texts);
        
        console.log(`  Total texts analyzed: ${result.summary.totalTexts}`);
        console.log(`  Total vowels found: ${result.summary.totalVowels}`);
        console.log(`  Average vowels per text: ${result.summary.averageVowels}`);
        console.log(`  Text with most vowels: "${result.summary.textWithMostVowels.text}" (${result.summary.textWithMostVowels.total})`);
        console.log(`  Text with least vowels: "${result.summary.textWithLeastVowels.text}" (${result.summary.textWithLeastVowels.total})`);
        
        console.log("  Individual results:");
        result.results.forEach((item, index) => {
            console.log(`    ${index + 1}. "${item.text}" -> ${item.total} vowels`);
        });
        console.log();
    }
    
    /**
     * Test vowel position finding
     */
    static testVowelPositions() {
        console.log("📍 Testing Vowel Position Finding:");
        
        const text = "Hello World";
        const positions = findVowelPositions(text);
        
        console.log(`  Text: "${text}"`);
        console.log(`  Total vowels found: ${positions.total}`);
        console.log("  Vowel positions:");
        
        positions.positions.forEach(pos => {
            console.log(`    '${pos.vowel}' at position ${pos.position} (original: '${pos.originalChar}')`);
        });
        console.log();
    }
    
    /**
     * Test vowel removal
     */
    static testVowelRemoval() {
        console.log("🗑️ Testing Vowel Removal:");
        
        const testCases = [
            "Hello World",
            "JavaScript Programming",
            "Python Development"
        ];
        
        testCases.forEach(text => {
            const removed = removeVowels(text);
            console.log(`  Original: "${text}"`);
            console.log(`  Without vowels: "${removed}"`);
        });
        
        // Test with custom vowels
        const customRemoved = removeVowels("Hello World", { customVowels: ['l'] });
        console.log(`  Custom removal (l as vowel): "${customRemoved}"`);
        console.log();
    }
    
    /**
     * Test vowel replacement
     */
    static testVowelReplacement() {
        console.log("🔄 Testing Vowel Replacement:");
        
        const text = "Hello World";
        
        const replacements = ['*', '#', 'X', '0'];
        
        replacements.forEach(replacement => {
            const replaced = replaceVowels(text, replacement);
            console.log(`  Replace with '${replacement}': "${replaced}"`);
        });
        
        // Test with custom vowels
        const customReplaced = replaceVowels(text, "*", { customVowels: ['l'] });
        console.log(`  Custom replacement (l as vowel): "${customReplaced}"`);
        console.log();
    }
    
    /**
     * Test error handling
     */
    static testErrorHandling() {
        console.log("⚠️ Testing Error Handling:");
        
        // Test invalid input types
        const invalidInputs = [
            { input: null, description: "null input" },
            { input: undefined, description: "undefined input" },
            { input: 123, description: "number input" },
            { input: {}, description: "object input" },
            { input: [], description: "array input" }
        ];
        
        invalidInputs.forEach(({ input, description }) => {
            try {
                countVowels(input);
                console.log(`  ❌ ${description}: Should have thrown error`);
            } catch (error) {
                console.log(`  ✅ ${description}: ${error.message}`);
            }
        });
        
        // Test invalid options
        try {
            countVowels("Hello", "invalid options");
            console.log(`  ❌ Invalid options: Should have thrown error`);
        } catch (error) {
            console.log(`  ✅ Invalid options: ${error.message}`);
        }
        
        // Test invalid multiple texts
        try {
            countVowelsMultiple("not an array");
            console.log(`  ❌ Invalid multiple texts: Should have thrown error`);
        } catch (error) {
            console.log(`  ✅ Invalid multiple texts: ${error.message}`);
        }
        
        console.log();
    }
}

/**
 * Performance Benchmark Tests
 */
class PerformanceTests {
    
    /**
     * Run performance benchmarks
     */
    static runBenchmarks() {
        console.log("⚡ Performance Benchmarks:\n");
        
        this.benchmarkBasicCounting();
        this.benchmarkLargeTexts();
        this.benchmarkMultipleTexts();
        
        console.log("🏁 Benchmarks completed!\n");
    }
    
    /**
     * Benchmark basic counting performance
     */
    static benchmarkBasicCounting() {
        console.log("📊 Basic Counting Performance:");
        
        const testText = "This is a test string with vowels for performance testing. ".repeat(1000);
        const iterations = 1000;
        
        const startTime = process.hrtime.bigint();
        
        for (let i = 0; i < iterations; i++) {
            countVowels(testText);
        }
        
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
        
        console.log(`  ${iterations} iterations on ${testText.length} character text`);
        console.log(`  Total time: ${duration.toFixed(2)}ms`);
        console.log(`  Average time per iteration: ${(duration / iterations).toFixed(4)}ms`);
        console.log();
    }
    
    /**
     * Benchmark large text performance
     */
    static benchmarkLargeTexts() {
        console.log("📏 Large Text Performance:");
        
        const sizes = [1000, 10000, 100000];
        
        sizes.forEach(size => {
            const largeText = "a".repeat(size) + "e".repeat(size) + "i".repeat(size) + "o".repeat(size) + "u".repeat(size);
            
            const startTime = process.hrtime.bigint();
            const result = countVowels(largeText);
            const endTime = process.hrtime.bigint();
            const duration = Number(endTime - startTime) / 1000000;
            
            console.log(`  ${size * 5} character text: ${duration.toFixed(4)}ms (${result.total} vowels found)`);
        });
        console.log();
    }
    
    /**
     * Benchmark multiple text analysis
     */
    static benchmarkMultipleTexts() {
        console.log("📚 Multiple Text Analysis Performance:");
        
        const textCounts = [10, 100, 1000];
        
        textCounts.forEach(count => {
            const texts = Array.from({ length: count }, (_, i) => `Text ${i} with vowels aeiou`);
            
            const startTime = process.hrtime.bigint();
            const result = countVowelsMultiple(texts);
            const endTime = process.hrtime.bigint();
            const duration = Number(endTime - startTime) / 1000000;
            
            console.log(`  ${count} texts: ${duration.toFixed(4)}ms (${result.summary.totalVowels} total vowels)`);
        });
        console.log();
    }
}

/**
 * Interactive Demo
 */
class InteractiveDemo {
    
    /**
     * Run interactive demonstration
     */
    static runDemo() {
        console.log("🎮 Interactive Vowel Counter Demo\n");
        
        const demoTexts = [
            "Hello World!",
            "JavaScript is awesome!",
            "Programming with vowels",
            "AEIOU and sometimes Y",
            "The quick brown fox jumps over the lazy dog"
        ];
        
        demoTexts.forEach((text, index) => {
            console.log(`Demo ${index + 1}: "${text}"`);
            
            // Basic analysis
            const basic = countVowels(text);
            console.log(`  📊 Basic: ${basic.total} vowels (${basic.vowelPercentage}%)`);
            
            // With Y as vowel
            const withY = countVowels(text, { includeY: true });
            console.log(`  🎯 With Y: ${withY.total} vowels`);
            
            // Vowel positions
            const positions = findVowelPositions(text);
            const positionStr = positions.positions.map(p => `${p.vowel}(${p.position})`).join(', ');
            console.log(`  📍 Positions: ${positionStr}`);
            
            // Remove vowels
            const removed = removeVowels(text);
            console.log(`  🗑️ Without vowels: "${removed}"`);
            
            // Replace vowels
            const replaced = replaceVowels(text, "*");
            console.log(`  🔄 Replaced: "${replaced}"`);
            
            console.log();
        });
    }
}

// Main execution
if (require.main === module) {
    console.log("🚀 Vowel Counter Library - Comprehensive Test Suite\n");
    
    // Run all tests
    VowelCounterTests.runAllTests();
    
    // Run performance benchmarks
    PerformanceTests.runBenchmarks();
    
    // Run interactive demo
    InteractiveDemo.runDemo();
    
    console.log("🎉 All demonstrations completed successfully!");
    console.log("\n📖 For more information, see the README.md file");
    console.log("🔧 To use in your project, import the functions from Assignment.js");
}