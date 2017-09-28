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
  height: 52px;
  padding: 14px 0 14px 10px;
  background-color: #FFFFFF;
  a{
    display: block;
    width: 50px;
    padding-left: 15px;
    position: relative;
    color: $primary-font1;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    &:after{
      content: "<";
      position: absolute;
      width:6px;
      height: 10px;
      color: #666;
      transform: scale(0.7, 1.4);
      top: -4px;
      left: 0;
    }
  }
}
</style>
