<template>
  <div class="list">
    <div class="header-search header-search-eee">
      <form class="" action="index.html" method="post">
        <strong class="lable">用户名：</strong>
        <input type="text" placehoder="请输入用户名" name="" value="">
      </form>
      <hsy-select :options="userTypes" placehoder="请选择" v-model="params.adType">用户类型:</hsy-select>
      <div class="search"></div>
    </div>
    <div class="table-list">
      <ul class="table-ul-common">
        <li id="header-15">
          <span>交易流水号</span>
          <span>交易时间</span>
          <span>用户名</span>
          <span>用户类型</span>

          <span>交易类型</span>
          <span>交易金额</span>
          <span>相关资产编号</span>
        </li>
        <li v-for="(item, index) in list" v-bind:class="[item.isSel? asset-tatus : '']">
          <span>{{ item.txNumber }}</span>
          <span>{{ item.createTime }}</span>
          <span>{{ item.username }}</span>
          <span>{{ item.userType }}</span>

          <span>{{ item.txType }}</span>
          <span class="blue">{{ item.txMoney }}</span>
          <span>{{ item.assetNumber }}</span>
        </li>
        <li v-if="list.length <= 0">暂无信息</li>
      </ul>
    </div>
    <hsy-pagination
    :total="total"
    :pageSize="params.size"
    :page="params.page"
    @hsyCurrentChange="currentChange"></hsy-pagination>
    <adver-info :adverInfo="adverInfo" v-on:updateVisible="updateVisible"></adver-info>
  </div>
</template>
<script>
import { value } from './adver.list.js'
import AdService from '@/services/ad.service'
import AdverInfo from './adver.info.vue'

export default {
  data() {
    return {
      value: '',
      total: 0,
      value3: '',
      params: {
        adType: 0,
        linkType: 0,
        adStatus: 0,
        adName: '',
        sourceType: 10,
        page: 1,
        size: 20
      },
      list: [],
      ...value,
      adverInfo: {
        dialogTitle: '开启投放此广告',
        visible: false,
        adId: undefined,
        sourceType: ''
      }
    }
  },
  computed: {
    isFull () {
      return this.$route.params.sourceType === 'full'
    },
    sourceName () {
      return this.$route.params.sourceType
    }
  },
  mounted() {
    this.AdService = new AdService()
    this.getList()
  },
  methods: {
    async getList () {
      let self = this
      let res = await this.AdService.assetInfo()
      self.list = res
    },
    search () {
      this.getList()
    },
    currentChange (val) {
      this.params.page = val
      this.getList()
    },
    add () {
      if (this.isFull) {
        this.$router.push('/adver/full/add')
      } else {
        this.$router.push('/adver/settle/add')
      }
    },
    adEdit(adId, adStatusDesc) {
      this.adverInfo.visible = true
      this.adverInfo.adId = adId
      this.adverInfo.adStatusDesc = adStatusDesc
      this.adverInfo.sourceType = this.params.sourceType
    },
    updateVisible(flag) {
      this.adverInfo.visible = flag
    },
    check (item) {
      // this.$router.push('/adver/' + this.sourceName + '/check?adId=' + item.adId + '&adName=' + item.adName + '&adTypeDesc=' + item.adTypeDesc + '&linkTypeDesc=' +
      // item.linkTypeDesc + '&deliveryDesc=' + item.deliveryDesc + '&activeTime=' + (item.activeTime || '') + '&adStatusDesc=' + item.adStatusDesc)
      this.$router.push('/adver/settle/check?adId=' + item.adId)
    },
    // 暂停/投放 = 21 下刊 = 30
    edit (item, tag) {
      let self = this
      let params = {
        adId: item.adId,
        adStatus: tag
      }
      let confirm = {
        content: '此操作下次开机/登录生效',
        title: '确定暂停播放此广告?'
      }
      if (item.adStatusDesc === '暂停') {
        confirm.title = '开启投放此广告?'
      }
      if (tag === 30) {
        confirm.content = '设置为下刊后将不可继续恢复，确定下刊?'
        confirm.title = ''
      }
      self.$confirm(confirm.content, confirm.title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        self.AdService.changeAdStatus(params).then(() => {
          self.getList()
        })
      }).catch(() => {
      })
    },
    modify (item) {
      this.$router.push('/adver/' + this.sourceName + '/edit/' + item.adId)
    },
    assetStatus () {
      console.log(this.isSel + '----1')
      if (this.isSel) {
        this.isSel = false
      } else {
        this.isSel = true
      }
      console.log(this.isSel + '----2')
    }
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  watch: {
    '$route' () {
      this.params = {
        adType: 0,
        linkType: 0,
        adStatus: 0,
        adName: '',
        sourceType: 10,
        page: 1,
        size: 20
      }
      this.getList()
    }
  },
  components: {
    AdverInfo
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
#header-15 {
  background-color: $primary-font;
}
.search {
  width: 34px;
  height: 34px;
  background: url(../../../assets/img/icon/search.png) no-repeat center;
  background-size: 14px 14px;
  background-color: $topic-color;
}
.table-ul-common{
  box-shadow: 0 0 1px #fff;
  li{
    color: #666666;
    span{
      word-break: break-all;
      text-align: center;
      a{
        color: #666666;
      }
    }
    span:nth-child(1) {
      width: 6%
    }
    span:nth-child(2) {
      width: 6%
    }
    span:nth-child(3) {
      width: 6%
    }
    span:nth-child(4) {
      width: 6%
    }
    span:nth-child(5) {
      width: 6%
    }
    span:nth-child(6) {
      width: 6%
    }
    span:nth-child(7) {
      width: 6%
    }
  }
  .asset-tatus {
    background-color: $list-checked-bg;
    span:nth-child(1) i {
      background: url(../../../assets/img/icon/duigou.png) no-repeat center;
      background-size: contain;
    }
  }
}
.header-search-eee {
  height: 74px;
  background-color: $primary-font4;
}
input[type="button"] {
  display: block;
  width: 200px;
  height: 34px;
  border-radius: 10px;
  background-color: $topic-color;
  color: #fff;
  margin: 20px 0 20px 27px;
}
.blue {
  color: #4990E2;
}
form {
  .lable {
    display: block;
    padding-right: 13px;
    float: left;
    line-height: 38px;
  }
  input[type="text"] {
    display: block;
    height: 38px;
    width: 270px;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
    float: left;
    background-color: #fff;
    margin-right: 25px;
    height: 34px;
    text-align: left;
    padding-left: 15px;
    box-sizing: border-box;
  }
}
</style>
