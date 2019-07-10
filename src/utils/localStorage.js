import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function getLocalStorage (key) {
  return localStorage.get(key)
}

export function setLocalStorage (key, value) {
  localStorage.set(key, value)
}

export function deleteLocalStorage (key) {
  localStorage.delete(key)
}

export function clearLocalStorage () {
  localStorage.clear()
}

export function getBookObject (fileName, key) {
  if (getLocalStorage(`${fileName}-info`)) {
    return getLocalStorage(`${fileName}-info`)[key]
  } else {
    return null
  }
}

export function setBookObject (fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getFontSize (fileName) {
  return getBookObject(fileName, 'fontSize')
}

export function saveFontSize (fileName, fontSize) {
  setBookObject(fileName, 'fontSize', fontSize)
}

export function getFontFamily (fileName) {
  return getBookObject(fileName, 'fontFamily')
}

export function saveFontFamily (fileName, font) {
  setBookObject(fileName, 'fontFamily', font)
}

// 主题
export function getTheme (fileName) {
  return getBookObject(fileName, 'theme')
}

export function saveTheme (fileName, theme) {
  setBookObject(fileName, 'theme', theme)
}

// 章节
export function getSection (fileName) {
  return getBookObject(fileName, 'section')
}

export function saveSection (fileName, section) {
  setBookObject(fileName, 'section', section)
}
// 进度
export function getLocation (fileName) {
  return getBookObject(fileName, 'location')
}

export function saveLocation (fileName, location) {
  setBookObject(fileName, 'location', location)
}

// 阅读时间
export function getReadTime (fileName) {
  return getBookObject(fileName, 'readTime')
}

export function saveReadTime (fileName, readTime) {
  setBookObject(fileName, 'readTime', readTime)
}

// 检测本地语言
export function getLocale () {
  return getLocalStorage('local')
}

export function saveLocale (locale) {
  setLocalStorage('locale', locale)
}

export function getHome () {
  return getLocalStorage('home')
}

export function saveHome (home) {
  setLocalStorage('home', home)
}
