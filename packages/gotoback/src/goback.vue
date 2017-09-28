<template>
<div class="go-back">
  <a @click="$router.go(-1)">返回</a>
</div>
</template>
<script>
export default {
  name: 'go-back',
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

.go-back{
  width: 100%;
  padding: 15px 10px;
  a{
    display: block;
    width: 50px;
    padding-left: 15px;
    position: relative;
    color: $primary-font;
    height: 20px;
    line-height: 20px;
    &:after{
      content: "";
      position: absolute;
      width:6px;
      height: 10px;
      background: url(#{$iconImgUrl}/icon/goback.png) no-repeat;
      background-size: 6px;
      top: 5px;
      left: 0;
    }
  }
}
</style>
