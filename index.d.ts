declare function slugify(string: string): string
declare function unslugify(slug: string): string
declare function sanitize(str: string): string
declare function countSpecialChars(str: string): number
declare function filterItems(contentItems: string[], oldItems: string[], blacklist?: RegExp[]): string[]
declare function getItemsFromContent(content: string): string[]
declare function parseObjectsFromText(content: string, properties: string[]): any[]
declare function seededRandom(seed: number): number
declare function pickOne(arr: any[], h?: number): any
declare function pickMany(arr: any[], limit?: number, h?: number): any[]
declare function removeDuplicatesFromArray<T>(array: T[], compare?: keyof T | null): T[]
declare function decodeHtmlEntities(text: string): string
declare function escapeRegExp(string: string): string
declare function log(...args: unknown[]): void
declare function info(...args: unknown[]): void
declare function warn(...args: unknown[]): void
declare function error(...args: unknown[]): void
declare function post(...args: unknown[]): void
declare function get(...args: unknown[]): void
declare function throwApiError(error: any, message?: string): string
declare function toTitleCase(str: string): string
declare function toUpperCase(str: string): string
declare function toLowerCase(str: string): string
declare function toCamelCase(str: string): string
declare function toPascalCase(str: string): string
declare function toHyphenCase(str: string): string
declare function toSnakeCase(str: string): string
declare function toDotCase(str: string): string
declare function toSentenceCase(str: string): string
declare function toUpperHyphenCase(str: string): string
declare function getRandomLoremIpsum({ minLength, maxLength, textCase }?: { minLength?: number; maxLength?: number; textCase?: string }): string
