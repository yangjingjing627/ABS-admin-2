<template>
<div class="adver-model key-wrap">
  <input type="text" placeholder="添加关键字" v-model="key"/>
  <a class="button" @click="save" :disabled="keyList.length>=10">添加</a>
  <p class="error-tip" v-if="error.length>0">{{error}}</p>
  <span class="btn-item" v-for="(item, index) in keyList" :key="item">
    <a class="button-key">{{item}}</a>
    <a class="btn-clear" @click="spliceItem(index)">删除</a>
  </span>
</div>
</template>
<script>
export default {
  data() {
    return {
      keyReg: /^[\u4e00-\u9fa5|a-zA-Z0-9]{1,20}$/,
      key: '',
      keyList: [],
      error: ''
    }
  },
  props: ['linkTypeInfo'],
  methods: {
    save() {
      if (!this.keyReg.test(this.key)) {
        this.error = '关键字只允许输入1~20个字、字母和数字'
        return
      }
      this.error = ''
      this.keyList.splice(0, 0, this.key)
      this.key = ''
    },
    spliceItem(index) {
      this.keyList.splice(index, 1)
    }
  },
  watch: {
    'keyList' (val) {
      this.$emit('linkKeyfun', val)
    },
    'linkTypeInfo' (val) {
      this.keyList = [...val]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
.key-wrap {
  width: 360px;
  font-size: 12px;
  line-height: 17px;
  color: $font-color;
  padding: 7px 7px 17px;
  input[type="text"] {
    width: 140px;
    height: 28px;
    line-height: 28px;
    border: 1px solid $border-color;
    border-radius: 4px;
    letter-spacing: 0;
    text-align: center;
    box-sizing: border-box;
  }
  .button[disabled] {
    background: $border-color;
    cursor: default;
    pointer-events: none;
  }
  .input[type="text"], .button {
    display: inline-block;
    vertical-align: top;
  }
  .btn-clear {
    color: $primary-font;
    letter-spacing: 0;
    display: inline-block;
    cursor: pointer;
    padding-right: 15px;
    padding-left: 15px;
  }
  .btn-item {
    display: inline-block;
    box-sizing: border-box;
    padding-right: 0;
    margin-top: 16px;
    font-size: 0;
    min-width: 160px;
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
  .button-key, .btn-clear {
    font-size: 12px;
  }
  .error-tip {
    color: #ff4343;
    text-align: left;
    margin-top: 4px;
    letter-spacing: 0;
  }
}
</style>
