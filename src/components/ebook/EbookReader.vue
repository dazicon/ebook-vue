<template>
    <div class="ebook">
      <div id="read"></div>
    </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import Epub from 'epubjs'
  import {
    getTheme,
    saveTheme
  } from '../../utils/localStorage'

  global.epub = Epub
  export default {
    mixins: [ebookMixin],
    methods: {
      prevPage () {
        if (this.rendition) {
          this.rendition.prev()
          this.hideTitleAndMenu()
        }
      },
      nextPage () {
        if (this.rendition) {
          this.rendition.next()
          this.hideTitleAndMenu()
        }
      },
      toggleTitleAndMenu () {
        if (this.menuVisible) {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }
        // console.log('menu title')
        // this.$store.dispatch('setMenuVisible', !this.menuVisible)
        this.setMenuVisible(!this.menuVisible)
      },
      hideTitleAndMenu () {
        // this.$store.dispatch('setMenuVisible', false)
        this.setMenuVisible(false)
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      },
      initTheme () {
        let defaultTheme = getTheme(this.fileName)
        if (!defaultTheme) {
          defaultTheme = this.themeList[0].name
          saveTheme(this.fileName, defaultTheme)
        }
        this.setDefaultTheme(defaultTheme)
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        this.rendition.themes.select(defaultTheme)
      },
      initEpub () {
        const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
        console.log(url)
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        console.log(this.book)
        // 渲染电子书
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
					height: window.innerHeight,
          method: 'default'
        })
        this.rendition.display().then(() => {
          this.initTheme()
          this.initGlobalStyle()
        })
        // 手势监听
        this.rendition.on('touchstart', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
          console.log(this.touchStartX)
        })
        this.rendition.on('touchend', event => {
					const offsetX = event.changedTouches[0].clientX - this.touchStartX
          const time = event.timeStamp - this.touchStartTime
          console.log(offsetX, time)
					if (time < 500 && offsetX > 40) {
						this.prevPage()
					} else if (time < 500 && offsetX < -40) {
						this.nextPage()
					} else {
						this.toggleTitleAndMenu()
					}
					event.preventDefault()
					event.stopPropagation()
        })
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
          ]).then(() => {})
        })
      }
    },
    mounted () {
      // const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(this.$route.params.fileName.split('|').join('/'))
        .then(() => {
          this.initEpub()
        })
    }
  }
</script>

<style scoped lang="scss">

</style>
