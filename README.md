# ASS - Utility Library
A simple utility library to streamline and simplify your JavaScript development process.

## Installation

Install via npm:

```bash
npm install ass
```

## Functions

### String Manipulation

- slugify(text): Convert text into a URL-friendly format.
- unslugify(slug): Convert a URL-friendly slug back into readable text.
- sanitize(text): Remove potentially harmful characters from text.
- countSpecialChars(text): Count the number of special characters in a text.
- toTitleCase(text): Convert text to Title Case.
- toUpperCase(text): Convert text to UPPERCASE.
- toLowerCase(text): Convert text to lowercase.
- toCamelCase(text): Convert text to camelCase.
- toPascalCase(text): Convert text to PascalCase.
- toHyphenCase(text): Convert text to hyphen-case.
- toSnakeCase(text): Convert text to snake_case.
- toDotCase(text): Convert text to dot.case.
- toSentenceCase(text): Convert text to Sentence case.
- decodeHtmlEntities(text): Decode HTML entities into readable text.
- escapeRegExp(text): Escape special characters in a regular expression string.

### Array Utilities

- filterItems(items, predicate): Filter an array based on a predicate function.
- getItemsFromContent(content, itemRegex): Extract items from content based on a regex.
- pickOne(array): Randomly select one item from an array.
- pickMany(array, count): Randomly select multiple items from an array.
- removeDuplicatesFromArray(array): Remove duplicate items from an array.
- removeDuplicatesFromArrays(arrays): Remove duplicate items from multiple arrays.

### Miscellaneous

- log(message): Log a message to the console.
- info(message): Log an information message to the console.
- warn(message): Log a warning message to the console.
- error(message): Log an error message to the console.
- get(url, options): Send a GET request to a URL.
- post(url, data, options): Send a POST request to a URL.
- throwApiError(response): Throw an error based on an API response.
- getRandomLoremIpsum(words): Get a random Lorem Ipsum text of the specified word length.

## Usage

Import the library into your project and use the functions as needed:

```javascript
import ass from 'ass'

const slug = ass.slugify('Hello World!')
console.log(slug) // Outputs: "hello-world"
```

## License

GNU
