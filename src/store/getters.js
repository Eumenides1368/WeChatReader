const book = {
  fileName: state => state.book.fileName,
  menuVisible: state => state.book.menuVisible,
  settingVisible: state => state.book.settingVisible,
  defaultFontSize: state => state.book.defaultFontSize,
  currentBook: state => state.book.currentBook,
  defaultFontFamily: state => state.book.defaultFontFamily,
  isFontFamilyShow: state => state.book.isFontFamilyShow,
  defaultTheme: state => state.book.defaultTheme,
  bookAvailable: state => state.book.bookAvailable,
  progress: state => state.book.progress,
  section: state => state.book.section,
  isPaginating: state => state.book.isPaginating,
  navigation: state => state.book.navigation,
  cover: state => state.book.cover,
  metadata: state => state.book.metadata,
  paginate: state => state.book.paginate,
  pagelist: state => state.book.pagelist,
  offsetY: state => state.book.offsetY,
  isBookmark: state => state.book.isBookmark
}
export default book
