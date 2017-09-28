<template>
<div class="adver-model sku-wrap">
  <div class="ipt-item">
    <input type="text" placeholder="输入商品条形码" v-model="sku"/>
    <p class="error-tip" v-if="error != undefined && error.length>0">{{error}}</p>
  </div>
  <a class="button" @click="getAdLinkSKU" :disabled="skuList.length>=10">添加</a>
  <ul class="row">
    <li class="row-item" v-for="(item, index) in skuList" :key="item.sku">
      <div class="item-box">
        <div>商品条形码:{{item.sku}}</div>
        <img :src="item.imageUrl" alt=""/>
        <p>{{item.goodsName}}</p>
      </div>
      <div class="btn-clear" @click="spliceItem(index)">删除</div>
    </li>
  </ul>
</div>
</template>
<script>
import AdService from '@/services/ad.service'
export default {
  data() {
    return {
      sku: '',
      skuList: [],
      error: false
    }
  },
  props: ['linkTypeInfo'],
  created() {
    this.AdService = new AdService()
  },
  methods: {
    async getAdLinkSKU() {
      try {
        this.error = false
        let res = await this.AdService.getAdLinkSKU({sku: this.sku})
        let f = true
        let self = this
        for (let i = 0; i < self.skuList.length; i++) {
          if (self.skuList[i].sku === self.sku) {
            f = false
            break
          }
        }
        if (f) {
          this.skuList.push(res)
          this.sku = ''
        } else {
          this.$notify.info('已添加过该sku')
        }
      } catch (e) {
        this.error = e.message
      }
    },
    spliceItem(index) {
      this.skuList.splice(index, 1)
    }
  },
  watch: {
    'skuList' (val) {
      this.$emit('linkSkufun', val)
    },
    'linkTypeInfo' (val) {
      this.skuList = [...val]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
input::-webkit-input-placeholder {
  font-size: 12px;
  color: #CBCBCB;
  letter-spacing: 0;
}
.sku-wrap {
  width: 446px;
  font-size: 12px;
  line-height: 17px;
  color: $font-color;
  padding: 16px 6px;
  .ipt-item {
    margin-right: 12px;
  }
  input[type="text"] {
    width: 140px;
    height: 28px;
    line-height: 28px;
    border: 1px solid $border-color;
    box-sizing: border-box;
    border-radius: 4px;
    letter-spacing: 0;
    text-align: center;
    display: block;
  }
  .button[disabled] {
    background: $border-color;
    cursor: default;
    pointer-events: none;
  }
  .ipt-item, .button {
    display: inline-block;
    vertical-align: top;
  }
  .error-tip {
    color: #ff4343;
    text-align: center;
    margin-top: 4px;
    letter-spacing: 0;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    line-height: 17px;
    .row-item {
      // flex: 1 0 170px;
      overflow: hidden;
      margin-top: 13px;
      &:nth-of-type(2n+1) {
        margin-right: 19px;
      }
      p {
        margin-left: 10px;
      }
    }
    .item-box {
      padding: 3px 5px;
      border: 1px solid $border-color;
      border-radius: 4px;
      margin-right: 11px;
      width: 170px;
      float: left;
      img {
        width: 58px;
        height: 58px;
        border: 1px solid $border-color;
        border-radius: 4px;
        float: left;
      }
      p {
        margin-left: 70px;
      }
    }
    .btn-clear {
      color: $primary-font;
      letter-spacing: 0;
      cursor: pointer;
      float: left;
      margin-top: 35px;
    }
  }
}
</style>
