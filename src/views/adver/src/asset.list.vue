<template>
  <div class="list">
    <div class="header-search">
      <hsy-select :options="types" v-model="params.adType">所属平台:</hsy-select>
      <hsy-select :options="ways" v-model="params.adType">状态:</hsy-select>
      <div :options="types" v-model="params.adType">创建时间:
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          placeholder="选择时间范围">
        </el-date-picker>
      </div>
      <div @click="search" class="search" ></div>
    </div>
    <div class="table-list">
      <ul class="table-ul-common">
        <li id="header-f">
          <span>资产编号</span>
          <span>产品名称</span>
          <span>生成时间</span>
          <span>产品类型</span>
          <span>基础资产</span>

          <span>项目规模</span>
          <span>原始债权人</span>
          <span>劣后级认购方</span>
          <span>次优级认购方</span>
          <span>优先级认购方</span>

          <span>预期收益率（%）</span>
          <span>支付方式</span>
          <span>信托机构</span>
          <span>差额支付承诺人</span>
          <span>资产评级机构</span>

          <span>会计事务所</span>
          <span>律师事务所</span>
          <span>备注</span>
          <span>状态</span>
          <span>操作</span>
        </li>
        <li v-for="(item, index) in list" v-bind:class="[item.isSel? asset-tatus : '']" class="asset-tatus">
          <span>{{ item.assetNumber }}</span>
          <span v-if="item.productName">{{ item.productName }}</span>
          <span v-else>无</span>
          <span>{{ item.createTime }}</span>
          <span v-if="item.productType">{{ item.productType }}</span>
          <span v-else>无</span>
          <span>{{ item.basicAsset }}</span>

          <span>
            {{ item.productSize }}
          </span>
          <span>{{ item.creditor }}</span>
          <span>{{ item.posteriorSubscriber }}</span>
          <span>{{ item.subPosteriorSubscriber }}</span>
          <span>{{ item.priorSubscriber }}</span>

          <span>{{ item.expectedProfitRate }}</span>
          <span>{{ item.paymentWay }}</span>
          <span>{{ item.spv }}</span>
          <span>{{ item.differencePaymentPromiser }}</span>
          <span>{{ item.ratingOrganisation }}</span>

          <span>{{ item.accountingFirm }}</span>
          <span>{{ item.lawFirm }}</span>
          <span>{{ item.comment }}</span>
          <span>{{ item.stateName }}</span>
          <span class="operation">
            <a @click="check(item.assetID)">详情</a>
            <a @click="modify(item.url)" v-if="item.executable">{{ item.urlAlt }}</a>
          </span>
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
      dateRange: '',
      list: [],
      ...value,
      params: {
        startDate: '',
        endDate: ''
      },
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
      let res = await this.AdService.allassets(this.params)
      for (let key in res) {
        res[key].isSel = false
      }
      self.list = res
    },
    search () {
      this.params.startDate = this.formatDate(this.dateRange[0])
      this.params.endDate = this.formatDate(this.dateRange[1])
      console.log(this.params)
      this.getList()
    },
    formatDate (date) {
      let d = new Date(date)
      d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      return d
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
    check (assetID) {
      this.$router.push('/asset/detail/list?assetID=' + assetID)
    },
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
    async modify (item) {
      await this.AdService.assetUrl(item)
      this.getList()
    },
    assetStatus () {
      if (this.isSel) {
        this.isSel = false
      } else {
        this.isSel = true
      }
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
#header-f {
  background-color: $primary-font;
}
.table-list, .header-search {
  width: 2000px;
}
.search {
  width: 34px;
  height: 34px;
  background: url(../../../assets/img/icon/search.png) no-repeat center;
  background-size: 14px 14px;
  background-color: $topic-color;
}
.table-ul-common{
  li{
    color: #666666;
    border: 1px solid #F9F9F9;
    box-sizing: border-box;
    span{
      word-break: break-all;
      text-align: center;
    }
    span:nth-child(1) {
      width: 6%
    }
    span:nth-child(2) {
      width: 5%
    }
    span:nth-child(3) {
      width: 5%
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
      width: 5%
    }
    span:nth-child(8) {
      width: 4%
    }
    span:nth-child(9) {
      width: 4%
    }
    span:nth-child(10) {
      width: 4%
    }
    span:nth-child(11) {
      width: 4%
    }
    span:nth-child(12) {
      width: 4%
    }
    span:nth-child(13) {
      width: 4%
    }
    span:nth-child(14) {
      width: 4%
    }
    span:nth-child(15) {
      width: 6%
    }
    span:nth-child(16) {
      width: 5%
    }
    span:nth-child(17) {
      width: 5%
    }
    span:nth-child(18) {
      width: 5%
    }
    span:nth-child(19) {
      width: 5%
    }
    span:nth-child(20) {
      width: 10%
    }
  }
}
</style>
