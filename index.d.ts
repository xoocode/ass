export declare function slugify(string: string): string
export declare function unslugify(slug: string): string
export declare function sanitize(str: string): string
export declare function countSpecialChars(str: string): number
export declare function filterItems(contentItems: string[], oldItems: string[], blacklist?: RegExp[]): string[]
export declare function getItemsFromContent(content: string): string[]
export declare function parseObjectsFromText(content: string, properties: string[]): any[]
export declare function seededRandom(seed: number): number
export declare function pickOne(arr: any[], h?: number): any
export declare function pickMany(arr: any[], limit?: number, h?: number): any[]
export declare function removeDuplicatesFromArray<T>(array: T[], compare?: keyof T | null): T[]
export declare function decodeHtmlEntities(text: string): string
export declare function escapeRegExp(string: string): string
export declare function log(...args: unknown[]): void
export declare function info(...args: unknown[]): void
export declare function warn(...args: unknown[]): void
export declare function error(...args: unknown[]): void
export declare function post(...args: unknown[]): void
export declare function get(...args: unknown[]): void
export declare function throwApiError(error: any, message?: string): string
export declare function toTitleCase(str: string): string
export declare function toUpperCase(str: string): string
export declare function toLowerCase(str: string): string
export declare function toCamelCase(str: string): string
export declare function toPascalCase(str: string): string
export declare function toHyphenCase(str: string): string
export declare function toSnakeCase(str: string): string
export declare function toDotCase(str: string): string
export declare function toSentenceCase(str: string): string
export declare function toUpperHyphenCase(str: string): string
export declare function getRandomLoremIpsum({ minLength, maxLength, textCase }?: { minLength?: number; maxLength?: number; textCase?: string }): string
