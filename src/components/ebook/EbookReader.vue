<template>
  <div class="ebook-reader">
    <!-- 动态路由 -->
    <div id="read"></div>
  </div>
</template>

<script>
// 管理vuex
// import { mapGetters } from 'vuex'
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme, getSection, saveSection, getLocation } from '../../utils/localStorage'
global.ePub = Epub
export default {
  // computed: {
  //   ...mapGetters(['fileName', 'menuVisible'])
  // },
  mixins: [ebookMixin],
  methods: {
    initFontFamily () {
      const font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initFontSize () {
      const fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      // 先全部注册好
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      // 然后再选择
      this.rendition.themes.select(defaultTheme)
      // 需要复用的东西放在mixin里面
      this.initGlobalTheme(this.defaultTheme)
      // addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      const location = getLocation(this.fileName)
      // console.log('loc: ' + location)
      this.display(location, () => {
        this.initTheme()
        this.initFontFamily()
        this.initFontSize()
        this.initGlobalTheme()
      })
      this.rendition.hooks.content.register(contents => {
        contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`)
        contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`)
        contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`)
        contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
      })
    },
    initGesture () {
      // 用on方法将事件绑定至iframe，实现翻页的手势
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        // console.log(this.offsetX)
        // console.log(this.time)
        // 翻页了
        if (time < 500 && offsetX < -40) {
          // 上一页
          this.nextPage()
        } else if (time < 500 && offsetX > 40) {
          // 上一页
          this.prevPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // 禁止事件传播
        event.preventDefault()
        event.stopPropagation()
      })
    },
    initSection () {
      // 初始化section章节信息
      const section = getSection(this.fileName)
      if (!section) {
        saveSection(this.fileName, section)
      } else {
        this.setSection(section)
      }
    },
    parseBook () {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
    },
    initEpub () {
      const baseUrl = 'http://localhost:8081/epub/'
      // 动态路由，目的是为了实现不同电子书的跳转
      const url = baseUrl + this.fileName + '.epub'
      // console.log(url)
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      // console.log(this.book)
      this.initRendition()
      this.initGesture()
      this.initSection()
      this.parseBook()
      // 进度条
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        // console.log(locations)
        this.setBookAvailable(true)
        this.getCurrentLocation()
      })
    },
    // 下一页
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.getCurrentLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    // 上一页
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.getCurrentLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    // 展示菜单
    toggleTitleAndMenu () {
      this.setMenuVisible(!this.menuVisible)
      if (this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setIsFontFamilyShow(false)
    }
  },
  mounted () {
    // 动态路由，目的是为了实现不同电子书的跳转
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
      // console.log(this.fileName)
      this.initEpub()
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
</style>
