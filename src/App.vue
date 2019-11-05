<template>
  <div id="app">
    <span class="text icon-A"></span>
    <span class="text icon-bookmark"></span>
    <router-view/>
  </div>
</template>

<script>
  export default {

  }
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style lang="scss">
  @import './assets/styles/global.scss';
  @import './assets/styles/icon.css';
  .text {
    font-size: px2rem(20);
    color: coral;
  }
</style>
