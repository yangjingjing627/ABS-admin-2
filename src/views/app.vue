<template>
  <div class="main">
    <top-bar></top-bar>
    <side-bar></side-bar>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import sideBar from '@/components/layout/sidebar'
import topBar from '@/components/layout/topbar'
export default {
  data: function () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {},
  components: {
    sideBar,
    topBar
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';

.main{
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: $top-height;
  padding-left: $side-width;
  background: $bg-color;
  .top-bar{
    position: absolute;
    top: 0;
    left: 0;
  }
  .side-bar{
    top: $side-top;
    position: absolute;
    left: 0;
  }
  .wrapper{
    width: 100%;
    height: 100%;
    background: #fff;
    // padding: 0 20px 40px 20px;
    overflow: auto;
    .list {
      width: 100%;
    }
  }
}

</style>
