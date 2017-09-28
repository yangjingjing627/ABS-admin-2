<template>
<div class="adver-model cate-wrap">
  <div class="model-box" v-if="list.length > 0">
    <label v-for="(item, index) in list" :key="item.cateId">
      <input type="checkbox" :id="item.cateId" v-model="item.checked" :value="item.cateName" @change="changeCate"/>
      <b class="cbx"></b>{{item.cateName}}
    </label>
  </div>
  已选<span class="count"> {{selItems}} </span>个品类
</div>
</template>
<script>
import AdService from '@/services/ad.service'
export default {
  data() {
    return {
      list: []
    }
  },
  props: ['linkTypeInfo'],
  computed: {
    selItems() {
      return this.list.filter((x) => x.checked === true).length
    }
  },
  created() {
    this.AdService = new AdService()
    this.getAdLinkCateList()
  },
  methods: {
    async getAdLinkCateList() {
      let list = await this.AdService.getAdLinkCateList()
      list.map((x) => { x.checked = false })
      this.list = list
    },
    changeCate () {
      let list = []
      this.list
      .filter(x => x.checked)
      .map((x) => {
        list.push(x.cateId)
      })
      this.$emit('linkCatefun', list)
    }
  },
  watch: {
    'linkTypeInfo' (val) {
      let cate = val
      cate.map(item => {
        this.list.map(li => {
          if (item.cateId === li.cateId) {
            li.checked = true
          }
        })
      })
      this.changeCate()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
.cate-wrap {
  width: 478px;
  font-size: 12px;
  line-height: 17px;
  padding: 7px 0 7px 10px;
  box-sizing: border-box;
  color: $font-color;
  .model-box {
    font-size: 0;
    border-bottom: 1px solid #dedede;
    padding-left: 6px;
    margin-left: -10px;
    margin-bottom: 4px;
    label {
      font-size: 12px;
      cursor: pointer;
      display: inline-block;
      width: 94px;
     }
    input[type="checkbox"] {
      display: none;
    }
    input:checked{
      &+.cbx:after{
        position: absolute;
        top: 0;
        left: 50%;
        content: '';
        width: 6px;
        height: 3px;
        border-left: 1px solid #3dbcfc;
        border-bottom: 1px solid #3dbcfc;
        transform: rotate(-45deg) translate(-50%,-50%);
      }
    }
    .cbx {
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 1px solid #dedede;
      border-radius: 2px;
      margin-right: 5px;
      position: relative;
    }
  }
  .count {
    color: #ff4343;
  }
}
</style>
