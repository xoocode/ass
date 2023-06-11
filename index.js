function slugify(string) {
  if (string === undefined || string === null) return ''

  return string
    .toString()
    .toLowerCase()
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, '') // remove all non-word chars
    .replace(/--+/g, '-') // replace multiple - with single -
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, '') // trim - from end of text
}

function unslugify(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function sanitize(str) {
  return str.replace(/[^\0-\x7F]/g, '')
}

// Counts the number of special characters, capital letters, and accents in a string
function countSpecialChars(str) {
  // Counts the number of capital letters in the string
  const capitalLetters = (str.match(/[A-Z]/g) || []).length
  // Counts the number of special characters in the string
  const specialChars = (str.match(/[^a-zA-Z0-9\s]/g) || []).length
  // Counts the number of accents in the string
  const accents = (str.match(/[\u0300-\u036f]/g) || []).length
  // Returns the total count of special characters, capital letters, and accents
  return capitalLetters + specialChars + accents
}

// Filters the content items based on given criteria
function filterItems(contentItems, oldItems, blacklist = []) {
  // Creates a dictionary with cleaned keys and original item values
  const cleanedToOriginal = contentItems.reduce((acc, item) => {
    // Cleans the item by converting to lowercase and removing non-alphanumeric characters
    const cleaned = item
      .toLowerCase()
      .normalize('NFD')
      .replace(/[^a-z0-9]/gi, '')

    // Retrieves the previous item with the same cleaned key, if any
    const previous = acc[cleaned]

    // If there's no previous item
    if (!previous) {
      // Updates the dictionary with the current item
      acc[cleaned] = item
    }
    // Returns the updated dictionary
    return acc
  }, {})

  // Creates a unique list of cleaned items with accents removed
  const uniqueCleanedItems = [...new Set(Object.keys(cleanedToOriginal).map((item) => item.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))]

  // Filters and returns the final list of items
  return (
    uniqueCleanedItems
      // Filters out empty items
      .filter((item) => item)
      // Removes items that are already in the list
      .filter((item) => !oldItems.includes(item))
      // Removes items that are too long
      .filter((item) => item.length < 32)
      // Removes items that are too short
      .filter((item) => item.length > 2)
      // Removes items that match the blacklist
      .filter((item) => !blacklist.some((regex) => regex.test(item)))
      // Maps the cleaned items back to their original values
      .map((item) => cleanedToOriginal[item])
  )
}

// Extracts items from content by matching brackets
function getItemsFromContent(content) {
  // Matches all items within brackets and removes the brackets
  return content.match(/\[(.*?)\]/g).map((item) => item.slice(1, -1))
}

function parseObjectsFromText(content, properties) {
  const regexStr = properties.map((prop) => `${prop}\\s?['"]?\\s?:([^,}\n]*)`).join('.*')
  const regex = new RegExp(regexStr, 'gi')
  let match
  const result = []

  while ((match = regex.exec(content)) !== null) {
    const obj = {}
    properties.forEach((prop, index) => {
      obj[prop] = match[index + 1].trim().replace(/^['"]|['"]$/g, '')
    })
    result.push(obj)
  }

  return result
}

function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function pickOne(arr, h = 3) {
  return pickMany(arr, 1, h)[0]
}

function pickMany(arr, limit = 10, h = 3) {
  // Check if the input is an iterable array
  if (!Array.isArray(arr)) {
    return []
  }

  const now = new Date()
  const seedHours = Math.floor(now.getUTCHours() / h) * h
  const seed = seedHours + now.getUTCFullYear() * 1000 + now.getUTCMonth() * 100 + now.getUTCDate()

  // Create a copy of the input array and shuffle it using the seededRandom function
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed) * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // Slice the shuffled array to get the selection
  const selection = shuffled.slice(0, limit)

  return selection
}

function removeDuplicatesFromArrays({ compare = null, arrays }) {
  const seenValues = new Set()
  const result = []

  const isDuplicate = (item) => {
    const value = compare ? item[compare] : item
    if (seenValues.has(value)) {
      return true
    } else {
      seenValues.add(value)
      return false
    }
  }

  for (const array of arrays) {
    const deduplicatedArray = array.filter((item) => !isDuplicate(item))
    result.push(deduplicatedArray)
  }

  return result
}

function removeDuplicatesFromArray(array, compare = null) {
  const seenValues = new Set()

  const isDuplicate = (item) => {
    const value = compare ? item[compare] : item
    if (seenValues.has(value)) {
      return true
    } else {
      seenValues.add(value)
      return false
    }
  }

  const deduplicatedArray = array.filter((item) => !isDuplicate(item))
  return deduplicatedArray
}

const decodeHtmlEntities = (text) => {
  const entitiesMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&ndash;': '–',
    '&mdash;': '—',
    '&hellip;': '…',
    '&eacute;': 'é',
    '&egrave;': 'è',
    '&ecirc;': 'ê',
    '&ouml;': 'ö',
    '&auml;': 'ä',
    '&uuml;': 'ü',
    '&aring;': 'å',
    '&oslash;': 'ø',
    '&laquo;': '«',
    '&raquo;': '»',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&#x2026;': '…',
  }

  return text.replace(/&(amp|lt|gt|quot|#39|nbsp|ndash|mdash|hellip|eacute|egrave|ecirc|ouml|auml|uuml|aring|oslash|laquo|raquo|copy|reg|trade|#x2026);/g, (match) => {
    return entitiesMap[match] || match
  })
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

function log(...args) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args)
  }
}
function info(...args) {
  if (process.env.NODE_ENV === 'development') {
    console.info(...args)
  }
}

function dev(...args) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof args[0] === 'string') {
      console.log('%cDEV%c' + args[0], 'font-size: 20px; font-weight: 600; background: red; color: white; border-radius: 4px; padding: 2px 4px; float: left; display: inline;', 'font-size: 20px;', ...args.slice(1))
    } else {
      console.log(...args)
    }
  }
}
function warn(...args) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(...args)
  }
}
function error(...args) {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args)
  }
}
function post(...args) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof args[0] === 'string') {
      console.log('%cPOST %c' + args[0], 'color: blue; font-weight: bold;', 'color: yellow;', ...args.slice(1))
    } else {
      console.log(...args)
    }
  }
}
function get(...args) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof args[0] === 'string') {
      console.log('%cGET %c' + args[0], 'color: blue; font-weight: bold;', 'color: yellow;', ...args.slice(1))
    } else {
      console.log(...args)
    }
  }
}

function throwApiError(error, message = '') {
  if (error.response && error.response.data && error.response.data.message) {
    return `${message} - error: ${error.response.data.message}`
  } else {
    return `${message} - error: ${error}`
  }
}

const toTitleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const toUpperCase = (str) => str.toUpperCase()
const toLowerCase = (str) => str.toLowerCase()
const toCamelCase = (str) =>
  str
    .split(' ')
    .map((word, index) => (index === 0 ? word.toLowerCase() : toTitleCase(word)))
    .join('')
const toPascalCase = (str) => str.split(' ').map(toTitleCase).join('')
const toHyphenCase = (str) => str.split(' ').join('-')
const toSnakeCase = (str) => str.split(' ').join('_')
const toDotCase = (str) => str.split(' ').join('.')
const toSentenceCase = (str) => toTitleCase(str)
const toUpperHyphenCase = (str) => str.split(' ').map(toUpperCase).join('-')

function getRandomLoremIpsum({ minLength = 8, maxLength = 20, textCase = 'sentenceCase' } = {}) {
  const loremIpsum =
    'lorem ipsum dolor sit amet consectetur adipiscing elit maecenas tempus bibendum nulla nec bibendum odio finibus sed fusce sagittis sapien vitae libero dapibus a ullamcorper urna maximus sed eleifend turpis a bibendum semper urna metus tincidunt enim et cursus est quam a risus pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui eum fugiat quo voluptas nulla pariatur'

  const words = loremIpsum.split(' ')
  const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
  const sliceEnd = Math.min(randomLength, words.length)
  let result = words.slice(0, sliceEnd).join(' ')

  switch (textCase) {
    case 'titleCase':
    case 'apStyleTitleCase':
    case 'startCase':
      result = toTitleCase(result)
      break
    case 'upperCase':
      result = toUpperCase(result)
      break
    case 'lowerCase':
      result = toLowerCase(result)
      break
    case 'camelCase':
      result = toCamelCase(result)
      break
    case 'pascalCase':
      result = toPascalCase(result)
      break
    case 'hyphenCase':
      result = toHyphenCase(result)
      break
    case 'snakeCase':
      result = toSnakeCase(result)
      break
    case 'dotCase':
      result = toDotCase(result)
      break
    case 'sentenceCase':
    default:
      result = toSentenceCase(result)
      break
  }

  return result
}

export default {
  slugify,
  unslugify,
  sanitize,
  countSpecialChars,
  filterItems,
  getItemsFromContent,
  parseObjectsFromText,
  pickOne,
  pickMany,
  removeDuplicatesFromArray,
  removeDuplicatesFromArrays,
  decodeHtmlEntities,
  escapeRegExp,
  log,
  info,
  dev,
  warn,
  error,
  post,
  get,
  throwApiError,
  toTitleCase,
  toUpperCase,
  toLowerCase,
  toCamelCase,
  toPascalCase,
  toHyphenCase,
  toSnakeCase,
  toUpperHyphenCase,
  toDotCase,
  toSentenceCase,
  getRandomLoremIpsum,
}
