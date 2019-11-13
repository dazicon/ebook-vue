<template>
    <div class="ebook">
      <div id="read"></div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Epub from 'epubjs'
  global.epub = Epub
  export default {
    computed: {
      ...mapGetters(['fileName'])
    },
    methods: {
      initEpub () {
        const url = 'http://192.168.0.100:8081/epub/' + this.fileName + '.epub'
        console.log(url)
        this.book = new Epub(url)
        console.log(this.book)
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight,
          method: 'default'
        })
        this.rendition.display()
      }
    },
    mounted () {
      // const fileName = this.$route.params.fileName.split('|').join('/')
      this.$store.dispatch('setFileName', this.$route.params.fileName.split('|').join('/'))
        .then(() => {
          this.initEpub()
        })
    }
  }
</script>

<style scoped lang="scss">

</style>
