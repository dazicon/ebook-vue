<template>
    <div class="ebook">
      <EbookTitle></EbookTitle>
      <EbookReader></EbookReader>
      <EbookMenu></EbookMenu>
      <EbookSettingFont></EbookSettingFont>
    </div>
</template>

<script>
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookMenu from '../../components/ebook/EbookMenu'
  import EbookSettingFont from '../../components/ebook/EbookSettingFont'

  export default {
    data () {
      return {
        title: 'imooc ebook'
      }
    },
    computed: {

    },
    created () {

    },
    mounted () {

    },
    watch: {

    },
    methods: {

    },
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu,
      EbookSettingFont
    }
  }
</script>

<style scoped lang="scss">

</style>
