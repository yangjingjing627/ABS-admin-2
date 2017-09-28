<template>
  <div class="check-result">
    <go-back></go-back>
    <div class="main-over">
      <p>基本信息</p>
      <div class="main-info">
        <ul>
          <li><span>产品名称：</span><span class="pad10">{{ data.productName }}</span></li>
          <li><span>项目规模：</span><span class="pad10">{{ data.productSize }}</span></li>
          <li><span>预期收益率（1%）：</span><span class="pad10">{{ data.expectedProfitRate }}</span></li>
          <li><span>次优级认购方：</span>
            <span>
              <el-select v-model="subPosteriorSubscriber" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>差额支付承诺人：</span>
            <span>
              <el-select v-model="differencePaymentPromiser" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>资产评级费（元）：</span><span class="pad10">{{ data.ratingMoney }}</span></li>
          <li><span>律师费（元）：</span><span class="pad10">{{ data.lawyerMoney }}</span></li>
        </ul>
        <ul>
          <li><span>产品类型：</span>
            <span>
              <el-select v-model="productType" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>原始债权人：</span><span class="pad10">{{ data.creditor }}</span></li>
          <li><span>信托机构：</span>
            <span>
              <el-select v-model="spv" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>优先级认购方：</span>
            <span>
              <el-select v-model="value3" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>资产评级机构：</span>
            <span>
              <el-select v-model="ratingOrganisation" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>信托管理费（元）：</span><span class="pad10">{{ data.spvMoney }}</span></li>
          <li><span>备注：</span>
            <span class="pad10" v-if="data.comment">{{ data.comment }}</span>
            <span class="pad10" v-else>无</span>
          </li>
        </ul>
        <ul>
          <li><span>基础资产：</span><span class="pad10">{{ data.basicAsset }}</span></li>
          <li><span>支付方式：</span>
            <span>
              <el-select v-model="value3" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>次级认购方：</span>
            <span>
              <el-select v-model="posteriorSubscriber" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>会计师事务所：</span>
            <span>
              <el-select v-model="accountingFirm" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>律师事务所：</span>
            <span>
              <el-select v-model="lawFirm" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li><span>律师费（元）：</span><span class="pad10">{{ data.lawyerMoney }}</span></li>
        </ul>
      </div>
    </div>
    <div class="main-over">
      <p>协议信息</p>
      <div class="main-info">
      <ul>
        <li><span>债券买卖协议：</span><span class="color-blue"><a @click="showAgreement(data.saleAgreementUrl)" href="#">{{ data.saleAgreementUrl }}</a></span></li>
        <li><span>法律意见书：</span><span class="color-blue"><a @click="showAgreement(data.legalOpinionUrl)"  href="">{{ data.legalOpinionUrl }}</a></span></li>
        <li><span>认购协议：</span><span class="color-blue"><a @click="showAgreement(data.subscriptionAgreementUrl)" href="#">{{ data.subscriptionAgreementUrl }}</a></span></li>
      </ul>
      <ul>
        <li><span>担保协议：</span><span class="color-blue"><a @click="showAgreement(data.guaranteeAgreementUrl)" href="#">{{ data.guaranteeAgreementUrl }}</a></span></li>
        <li><span>会计意见书：</span><span class="color-blue"><a @click="showAgreement(data.accountantOpinionUrl)" href="#">{{ data.accountantOpinionUrl }}</a></span></li>
      </ul>
      <ul>
        <li><span>资产评级说明：</span><span class="color-blue"><a @click="showAgreement(data.ratingInstructionUrl)" href="#">{{ data.ratingInstructionUrl }}</a></span></li>
        <li><span>产品计划说明书：</span><span class="color-blue"><a @click="showAgreement(data.productPlanInstructionUrl)" href="#">{{ data.productPlanInstructionUrl }}</a></span></li>
      </ul>
    </div>
    </div>
    <div class="main-over">
      <p>原始债券信息</p>
      <div class="main-info main-info-flex4">
        <ul>
          <li><span>债券资料：</span><span><input @click="downloadAllAsset(assetID)" type="button" name="" value="下载"></span></li>
        </ul>
        <ul></ul>
        <ul></ul>
      </div>
    </div>
  </div>
</template>
<script>
import AdService from '@/services/ad.service'
export default {
  data() {
    return {
      info: {},
      cover_data: {},
      city_count: {},

      data: {},
      subPosteriorSubscriber: '',
      differencePaymentPromiser: '',
      productType: '',
      spv: '',
      ratingOrganisation: '',
      accountingFirm: '',
      lawFirm: '',
      posteriorSubscriber: '',
      payOriginType: '按月支付',

      store_count: {},
      city: 'city',
      report: 'report',
      assetID: 0,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value3: '广东奥马电器广东奥马电器广东奥马电器'
    }
  },
  created() {
    this.AdService = new AdService()
  },
  mounted() {
    this.assetID = this.$route.query.assetID
    if (typeof (this.assetID) === 'string') {
      this.getAssetSingleInfo(this.assetID)
    }
  },
  methods: {
    async getAssetSingleInfo (assetID) {
      let res = await this.AdService.assetSingleInfo(assetID)
      this.data = res
      this.subPosteriorSubscriber = res.subPosteriorSubscriber
      this.differencePaymentPromiser = res.differencePaymentPromiser
      this.spv = res.spv
      this.ratingOrganisation = res.ratingOrganisation
      this.subPosteriorSubscriber = res.subPosteriorSubscriber
      this.accountingFirm = res.accountingFirm
      this.lawFirm = res.subPosteriorSubscriber
      this.posteriorSubscriber = res.posteriorSubscriber
    },
    async downloadAllAsset (assetID) {
      await this.AdService.downloadAsset(assetID)
      this.$notify.success('已打包成功')
    },
    async pp () {
      await this.AdService.getRatingUrl()
      this.$notify.success('获取协议债券买卖成功')
    },
    showAgreement (url) {
      this.$router.push('/asset/link?url=' + url)
      window.location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.check-result {
  width: 100%;
  .main-over {
    width: 1284px;
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
    ul {
      flex: 1;
      padding: 18px 0;
      li {
        width: 100%;
        height: 36px;
        display: table;
        line-height: 36px;
        font-size: 14px;
        margin: 4px 0;
        span {
          display: table-cell;;
          width: 49%;
          a {
            display: block;
            width: 100%;
            height: 100%;
          }
          .el-select {
            width: 100%;
            height: 100%;
          }
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
          &.pad10 {
            border: 1px solid $primary-font4;
            padding-left: 10px;
            box-sizing: border-box;
          }
          &.color-blue {
            color: #4990E2;
          }
        }
      }
    }
  }
}
.loading {
  width: 200px;
  height: 200px;
  background: #eee url(../../../assets/img/icon/loading45.gif) no-repeat center;
  background-size: 40px 40px;
}
input[type="button"] {
  width: 156px;
  height: 36px;
  line-height: 36px;
  display: block;
  background-color: $topic-color;
  color: #fff;
  border-radius: 4px;
}
</style>
