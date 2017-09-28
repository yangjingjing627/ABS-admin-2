<template>
  <div class='loading'>
  <div class='cover'></div>
  <div class='el-loading-mask is-fullscreen'>
    <div class='el-loading-spinner'>
      <svg viewBox='25 25 50 50' class='circular'>
      <circle cx='50' cy='50' r='20' fill='none' class='path'>
      </circle>
      </svg>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'hsy-loading',
  data () {
    return {
    }
  },
  props: [],
  events: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
$iconImgUrl:'../../../src/assets/img';

</style>
