// 将公共代码抽象出来，此处是vuex中的数据
import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss, getTimeByMinute } from './book'
import { saveLocation } from './localStorage'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'currentBook',
      'defaultFontFamily',
      'isFontFamilyShow',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    themeList () {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setCurrentBook',
      'setDefaultFontFamily',
      'setIsFontFamilyShow',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    initGlobalTheme (theme) {
      switch (theme) {
        case 'Default': {
          removeAllCss()
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        }
        case 'Gold': {
          removeAllCss()
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        }
        case 'Eye': {
          removeAllCss()
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        }
        case 'Night': {
          removeAllCss()
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        }
        default: {
          removeAllCss()
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        }
      }
    },
    getCurrentLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const startCfi = currentLocation.start.cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
      // console.log(progress)
      this.setProgress(Math.floor(progress * 100))
      this.setSection(currentLocation.start.index)
      saveLocation(this.fileName, startCfi)
    },
    display (target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.getCurrentLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.getCurrentLocation()
          if (cb) cb()
        })
      }
    },
    // 翻页时隐藏标题和菜单
    hideTitleAndMenu () {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setIsFontFamilyShow(false)
    },
    getReadTimeText () {
      return this.$t('book.haveRead').replace('$1', getTimeByMinute(this.fileName))
    }
  }
}
