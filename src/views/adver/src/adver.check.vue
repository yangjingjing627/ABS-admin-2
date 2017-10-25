<template>
  <div class="check-result">
    <go-back></go-back>
    <div class="main-over">
      <p>融资人注册信息</p>
      <div class="main-info">
        <ul>
          <li><span>公司名称：</span><span>数字乾元</span></li>
          <li><span>用户名：</span><span>XD13119197867</span></li>
        </ul>
        <ul>
          <li><span>法定代表人身份证号：</span><span>123456789012345678</span></li>
          <li><span>法定代表人名称：</span><span>刘强</span></li>
        </ul><ul>
          <li><span>法定代表人手机号：</span><span>13223458900</span></li>
          <li><span>项目联系人姓名：</span><span>刘强</span></li>
        </ul>
      </div>
    </div>
    <div class="main-over">
      <p>借款信息</p>
      <div class="main-info">
      <ul>
        <li><span>进行渠道（银行推介方）：</span><span>哪吒银行</span></li>
        <li><span>借款编号：</span><span>YB17080415361129</span></li>
        <li><span>借款金额（万元）：</span><span>风火轮暗示第1900期</span></li>
        <li><span>起息方式：</span><span>满标确认，次日起息</span></li>
        <li><span>起投金额：</span><span>100</span></li>
        <li><span>递增金额：</span><span>100</span></li>
        <li><span>借款总成本（%年化）：</span><span>7.0000</span></li>
        <li><span>筹款利率（%年化）：</span><span>7.0000</span></li>
        <li><span>出借项目角标：</span><span></span></li>
      </ul>
      <ul>
        <li><span>平台管理费（%等额本息）：</span><span>0.0000</span></li>
        <li><span>风险金率（%等额本息）：</span><span>0.0000</span></li>
        <li><span>借款产品类型：</span><span>风火轮暗示第1900期</span></li>
        <li><span>借款期限：</span><span>4月</span></li>
        <li><span>还款方式：</span><span>按月等额本息</span></li>
        <li><span>筹标期限：</span><span>7天</span></li>
        <li><span>描述标题：</span><span>项目内容</span></li>
        <li><span>借款期限：</span><span>4月</span></li>
        <li><span>还款方式：</span><span>按月等额本息</span></li>
      </ul>
      <ul>
        <li><span>筹标期限：</span><span>渣打银行</span></li>
        <li><span>描述标题：</span><span>XD13119197867</span></li>
        <li><span>描述内容：</span><span>该产品筹集资金为商户提供借款，用于其日常经营周转，扩大经营，借款人为商户法人，通过对商户营业流水、经营情况、信用情况等进行核查确保其按时还款，该产品仅向符合中华人民共和国有关法律法规及平台规定的喝个用户提供。</span></li>
        <li><span>描述标题：</span><span>还款方式</span></li>
        <li><span>描述内容：</span><span>按月等额本息</span></li>
      </ul>
    </div>
    </div>
    <div class="main-over">
      <p>导出其他借款信息</p>
      <div class="main-info main-info-flex4">
        <ul>
          <li><span>借款服务协议编号：</span><span></span></li>
          <li><span>借款协议编号：</span><span></span></li>
          <li><span>借款用途：</span><span>日常资金需求</span></li>
          <li><span>公司注册资本（万元）：</span><span></span></li>
          <li><span>公司注册日期（年月日）：</span><span></span></li>
          <li><span>公司注册地址：</span><span></span></li>
          <li><span>主营业务：</span><span>未知</span></li>
        </ul>
        <ul>
          <li><span>营业执照是否通过核实：</span><span>未知</span></li>
          <li><span>组织结构代码是否通过核实：</span><span>未知</span></li>
          <li><span>税务登记证是否通过核实：</span><span>未知</span></li>
          <li><span>法定代表人身份证号码：</span><span>未知</span></li>
          <li><span>公司注册日期（年月日）：</span><span></span></li>
        </ul>
        <ul>
          <li><span>融资方财务报表是否通过核实：</span><span></span></li>
          <li><span>是否对融资方进行实地核实：</span><span>未知</span></li>
          <li><span>融资方征信记录情况：</span><span>未知</span></li>
          <li><span>担保方公司名称:</span><span></span></li>
          <li><span>公司注册日期（年月日）</span><span></span></li>
        </ul>
        <ul>
          <li><span>授信时间（年月日）：</span><span>未知</span></li>
          <li><span>总授信额（万元）：</span><span>未知</span></li>
          <li><span>已使用额度（万元）：</span><span>未知</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import bqChart from '@/components/adver/chart'
import AdService from '@/services/ad.service'
import { API_HOST } from '@/config/global.config'
export default {
  data() {
    return {
      info: {},
      cover_data: {},
      city_count: {},
      store_count: {},
      city: 'city',
      report: 'report'
    }
  },
  mounted() {
    this.AdService = new AdService()
    this.info = this.$route.query
    // this.getCoverData()
    // this.getCityCountById()
    // this.getStoreCountById()
  },
  computed: {
    exportCoverData () {
      return API_HOST + 'admin/ad/export/cover?adId=' + this.info.adId
    },
    exportCountData () {
      return API_HOST + 'admin/ad/export/count?adId=' + this.info.adId
    },
    isFull () {
      return this.$route.params.sourceType === 'full'
    }
  },
  methods: {
    async getCoverData () {
      let res = await this.AdService.getCoverById({adId: this.info.adId})
      this.cover_data = res
    },
    async getCityCountById () {
      let res = await this.AdService.getCityCountById({adId: this.info.adId})
      this.city_count = res
    },
    async getStoreCountById () {
      let res = await this.AdService.getStoreCountById({adId: this.info.adId})
      this.store_count = res
    }
  },
  components: {
    bqChart
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.check-result {
  width: 100%;
  .main-over {
    // width: 1284px;
    padding-right: 10px;
    p {
      width: 100%;
      height: 54px;
      padding: 14px 0 14px 30px;
      background-color: $list-checked-bg;
      font-size: 24px;
    }
    .main-info {
      width: 100%;
      display: flex;
    }
    .main-info.main-info-flex4 {
      ul {
        li {
          span:nth-child(1) {
            width: 65%;
          }
          span:nth-child(2) {
            width: 30%;
          }
        }
      }
    }
    ul {
      flex: 1;
      padding: 18px 0;
      li {
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        display: table;
        span {
          display: table-cell;;
          width: 49%;
          float: left;
          &:nth-child(1) {
            text-align: right;
            color: $primary-font3;
            font-weight: medium;
          }
          &:nth-child(2) {
            text-align: left;
            color: $primary-font1;
            margin-left: 7px;
          }
        }
      }
    }
  }
}

</style>
