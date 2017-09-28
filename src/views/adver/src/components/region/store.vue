<template>
<div class="adver-model adver-region-store">
  <div class="store-info" v-show="!modifyStore">
    <h3>{{ storeType }}
      <a @click="modify">修改</a>
    </h3>
    <h3>
      已选 <i>{{ oldList.length }}</i> 个店铺
    </h3>
    <div class="list">
      <span v-for="item in oldList">
        ID：{{ item.storeId }}
        店铺名称：{{ item.storeName }}
      </span>
    </div>
  </div>
  <div class="modify-store" v-show="modifyStore">
    <h3>指定店铺投放
      <a @click="close" class="close"></a>
    </h3>
    <div class="store">
      <h4>
        <a class="round-select"
        :class="{'round-selected': playRegionType === 30}"
        @click="changeStoreType(30)">仅投放指定店铺</a>
        <a class="round-select"
        :class="{'round-selected': playRegionType === 31}"
        @click="changeStoreType(31)">仅指定店铺不投放</a>
      </h4>
      <div class="search">
        <hsy-input type="text" v-model="storeId" placeholder="店铺ID"></hsy-input>
        <a class="button" @click="addStore()">添加</a>
      </div>
      <ul class="res">
        <li v-for="item,index in storeList">
          <span>
            <i>ID：{{ item.storeId }}</i>店铺名称：{{ item.storeName }}</span>
          <a @click="deleteStore(index)">删除</a>
        </li>
      </ul>
      <div class="footer">
        <p>已选择 <i>{{ storeList.length }}</i> 个店铺</p>
        <div class="">
          <a class="button" @click="close">取消</a>
          <a class="button" @click="sure">确定</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import AdService from '@/services/ad.service'

export default {
  data() {
    return {
      modifyStore: false,
      playRegionType: 30,
      oldplayRegionType: 30,
      storeId: '',
      storeList: [],
      oldList: []
    }
  },
  props: ['storeInfo', 'playRegionType1'],
  computed: {
    storeType () {
      return this.oldplayRegionType === 30 ? '仅投放指定店铺' : '仅指定店铺不投放'
    }
  },
  mounted() {
    this.AdService = new AdService()
  },
  methods: {
    close () {
      this.modifyStore = false
    },
    sure () {
      this.oldplayRegionType = this.playRegionType
      this.oldList = [
        ...this.storeList
      ]
      this.$emit('changeStore', this.storeList, this.oldplayRegionType)
      this.modifyStore = false
    },
    changeStoreType (id) {
      this.playRegionType = id
    },
    modify () {
      this.modifyStore = true
    },
    async addStore () {
      if (!this.storeId) {
        this.$message.error('店铺id不能为空')
        return
      }
      let res = await this.AdService.getStoreById({storeId: this.storeId})
      let f = true
      let self = this
      for (let i = 0; i < self.storeList.length; i++) {
        if (self.storeList[i].storeId === parseInt(self.storeId)) {
          f = false
          break
        }
      }
      if (f) {
        this.storeList.push(res)
        this.storeId = ''
      } else {
        this.$notify.info('已添加过该店铺')
      }
    },
    deleteStore (index) {
      this.storeList.splice(index, 1)
    }
  },
  watch: {
    'storeInfo' (val) {
      this.storeList = [...val]
      this.oldList = [...val]
    },
    'playRegionType' (val) {
      this.playRegionType = val
    },
    'playRegionType1' (val) { // 接收从接口获取的值
      this.playRegionType = val
      this.oldplayRegionType = this.playRegionType
    }
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
$iconImgUrl:'../../../../../assets/img';
.adver-region-store{
  width: 380px;
  .store-info{
    padding: 0 16px;
    h3{
      font-size: 14px;
      border-bottom: 1px dashed $border-color;
      line-height: 20px;
      padding: 6px 0;
      a{
        margin-left: 10px;
        color: $primary-font;
      }
      i{
        color: $red;
      }
      &:last-child{
        border-bottom: none;
      }
    }
    .list{
      width: 100%;
      padding: 4px 0px 0 50px;
      font-size: 12px;
      overflow: hidden;
      span{
        padding-left: 12px;
        position: relative;
        display: inline-block;
        height: 17px;
        line-height: 17px;
        min-width: 80px;
        &:before{
          content: "";
          position: absolute;
          width: 6px;
          height: 5px;
          top: 7px;
          left: 0;
          background: url(#{$iconImgUrl}/icon/duihao.png) no-repeat;
          background-size: 6px;
        }
      }
    }
  }
  .modify-store{
    h3{
      height: 30px;
      line-height: 30px;
      color: #555;
      position: relative;
      text-align: center;
      border-bottom: 1px solid $border-color;
      a.close{
        position: absolute;
        width: 20px;
        height: 20px;
        background: url(#{$iconImgUrl}/icon/close.png) center no-repeat;
        background-size: 10px;
        top: 5px;
        right: 5px;
      }
    }
    .store{
      font-size: 12px;
      padding: 0 15px;
      h4{
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
        a{
          display: inline-block;
          margin-right: 20px;
        }
      }
      .res{
        display: block;
        width: 100%;
        border-bottom: 1px dashed $border-color;
        li{
          color: $primary-font;
          line-height: 28px;
          margin-bottom: 10px;
          span{
            display: inline-block;
            margin-right: 15px;
            height: 28px;
            border: 1px solid $border-color;
            padding: 0 6px;
            min-width: 230px;
            border-radius: 4px;
            i{
              padding-right: 15px;
            }
          }
          a{
            display: inline-block;
            text-decoration: underline;
          }
        }
      }
      .search{
        overflow: hidden;
        margin-bottom: 10px;
        .header-input{
          float: left;
          .hsy-input{
            width: 140px;
          }
        }
        a{
          float: left;
        }
      }
      .footer{
        p{
          i{
            color: $red;
          }
        }
        >div{
          text-align: center;
          margin: 10px;
          a{
            display: inline-block;
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>
