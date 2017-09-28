<template>
  <hsy-dialog v-if="packInfo.visible">
    <div slot="main">{{ packInfo.dialogTitle }}</div>
    <div slot="footer"><a class="button" @click="packVisible">{{ packInfo.button }}</a></div>
  </hsy-dialog>
</template>
<script>
import AdService from '@/services/ad.service'
export default {
  data() {
    return {
      info: {}
    }
  },
  props: {
    packInfo: {
      type: Object
    }
  },
  created() {
    this.AdService = new AdService()
  },
  computed: {
    sourceName () {
      return this.$route.params.sourceType
    }
  },
  methods: {
    goAdverFullAdd(info) {
      this.$router.push('/adver/' + this.sourceName + '/edit/' + info.adId)
    },
    packVisible() {
      this.$emit('getReList')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.close {
  position: absolute;
  cursor: pointer;
  width: 10px;
  height: 10px;
  top: 9px;
  right: 19px;
  &:before, &:after {
    position: absolute;
    content: '';
    width: 1px;
    height: 10px;
    background: #999;
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(45deg);
  }
}
.card {
  padding: 8px 0 0 47px;
  position: relative;
  color: $font-color;
  font-size: 12px;
  line-height: 17px;
  text-align: left;
  &-padding {
    padding-left: 61px;
    margin-top: 10px;
  }
  &-block {
    .time {
      display: inline-block;
      margin-top: 10px;
      max-width: 200px;
      width: auto;
      &:nth-of-type(1) {
        margin-top: 0;
      }
    }
  }
  &-group {
    width: 422px;
    padding: 12px 10px;
    border: 1px solid $border-color;
    border-radius: 4px;
  }
  &:before {
    position: absolute;
    content: '';
    top: 10px;
    left: 38px;
    width: 3px;
    height: 12px;
    background: #3dbcfc;
    border-radius: 2px;
  }
  h3, h4, p {
    font-size: 12px;
    line-height: 17px;
  }
  h3 {
    margin-bottom: 10px;
  }
  img, video {
    width: 108px;
    height: 78px;
    border: 1px solid $border-color;
    border-radius: 4px;
  }
}
.goods-item {
  width: 200px;
  height: 110px;
  display: inline-block;
  padding: 5px;
  margin-right: 24px;
  margin-bottom: 17px;
  border: 1px solid $border-color;
  border-radius: 4px;
  position: relative;
  &:nth-of-type(2n) {
    margin-right: 0;
  }
  h4 {
    text-align: center;
  }
  img {
    width: 73px;
    height: 73px;
    position: absolute;
    top: 27px;
    bottom: 10px;
    left: 11px;
    margin: 0;
  }
  p {
    position: absolute;
    padding-top: 17px;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 90px;
  }
}
.btn-item {
  display: inline-block;
  box-sizing: border-box;
  padding-right: 0;
  margin-top: 16px;
  font-size: 0;
  min-width: 160px;
}
.time {
  width: auto;
  padding: 0 15px;
  margin: 0 8px;
  height: 24px;
  line-height: 24px;
  border: 1px solid $border-color;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  text-align: center;
}
label {
  width: 100px;
  padding-right: 5px;
  line-height: 26px;
  &:nth-of-type(2n+4) {
    padding-right: 0;
  }
}
label, .cbx {
  display: inline-block;
  vertical-align: middle;
}
.store {
  label {
    display: block;
    width: auto;
  }
  .storeId {
    display: inline-block;
    min-width: 60px;
    padding-right: 20px;
  }
}
.cbx {
  position: relative;
  margin-right: 7px;
  display: inline-block;
  width: 8px;
  height: 5px;
  margin-top: -4px;
  border-left: 1px solid #3dbcfc;
  border-bottom: 1px solid #3dbcfc;
  transform: rotate(-45deg);
}
.btn-item {
  display: inline-block;
  box-sizing: border-box;
  padding-right: 0;
  margin-top: 16px;
  font-size: 0;
  min-width: 160px;
  font-size: 12px;
  &:nth-of-type(1), &:nth-of-type(2){
    margin-top: 0;
  }
}
.button-key {
  display: inline-block;
  background: #f1f1f1;
  border: 1px solid $border-color;
  border-radius: 4px;
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  box-sizing: border-box;
}

// }
</style>
