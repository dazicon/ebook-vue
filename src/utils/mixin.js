import { mapGetters, mapActions } from 'vuex'
import { themeList, setGlobalTheme } from './book'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
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
      'setMenuVisible',
      'setFileName',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    initGlobalStyle () {
      switch (this.defaultTheme) {
        case 'Default':
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Eye':
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Gold':
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Night':
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
      }
    }
  }
}
