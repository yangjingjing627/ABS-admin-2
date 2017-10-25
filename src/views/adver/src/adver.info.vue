<template>
<hsy-dialog v-if="adverInfo.visible" :visible="adverInfo.visible" :title="adverInfo.dialogTitle" v-on:updateVisible="updateVisible">
  <div slot="main">
    <div class="main-over">
      <div class="main-info">
        <ul>
          <li><span>产品名称</span>
            <span class="pad10">
              <input v-model="productName" type="text" name="" value="">
            </span>
          </li>
          <li><span>基础资产</span><span class="pad10"><input v-model="basicAsset" type="text" name="" value=""></span></li>
          <li><span>原始债权人</span><span class="pad10"><input type="text" name="" value=""></span></li>
        </ul>
        <ul>
          <li><span>产品类型</span>
            <span>
                <el-select v-model="productType" placeholder="请选择">
                  <el-option
                    v-for="item in data.productType"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </span>
          </li>
          <li><span>项目规模</span><span class="pad10"><input v-model="productSize" type="text" name="" value=""></span></li>
        </ul>
      </div>
    </div>

    <div class="project-size">
      <p>投资方</p>
      <ul>
        <li>
          <i @click="assetStatus(1)" v-bind:class="{ dui: isActive_1 }"></i>
          <b>劣后级认购方</b>
          <el-select v-model="subscriber1" placeholder="请选择">
            <el-option  v-for="(item, index) in data.investors" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </li>
        <li>
          <i @click="assetStatus(2)" v-bind:class="{ dui: isActive_2 }"></i>
          <b>次优级认购方</b>
          <el-select v-model="subscriber2" placeholder="请选择">
            <el-option  v-for="(item, index) in data.investors" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </li>
        <li>
          <i @click="assetStatus(3)" v-bind:class="{ dui: isActive_3 }"></i>
          <b>优先级认购方</b>
          <el-select v-model="subscriber3" placeholder="请选择">
            <el-option  v-for="(item, index) in data.investors" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <div class="main-over">
      <div class="main-info">
        <ul>
          <li><span>预期收益率（1%）</span><span class="pad10"><input v-model='expectedProfitRate' type="text" name="" value=""></span></li>
          <li><span>信托机构</span>
            <span>
                <el-select v-model="spvs"  placeholder="请选择">
                  <el-option
                    v-for="item in data.spvs"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </span>
          </li>
          <li><span>资产评级机构</span>
            <span>
                <el-select v-model="ratingOrganisations"  placeholder="请选择">
                  <el-option
                    v-for="item in data.ratingOrganisations"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </span>
          </li>
          <li><span>信托管理费（1%）</span><span class="pad10 readonly"><input type="text" readonly v-model="data.rateSetting.spvRate"  name=""></span></li>
          <li><span>资产评级费（1%）</span><span class="pad10 readonly"><input type="text" readonly name="" v-model="data.rateSetting.ratingRate"></span></li>
          <li><span>会计费（万元）</span><span class="pad10 readonly"><input type="text" readonly name="" v-model="data.rateSetting.accountantFee"></span></li>
        </ul>
        <ul>
          <li><span>支付方式</span>
            <span>
                <el-select v-model="payType"  placeholder="请选择">
                  <el-option
                    v-for="item in data.payType"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </span>
          </li>
          <li><span>差额支付承诺人</span>
            <span>
                <el-select v-model="promisers"  placeholder="请选择">
                  <el-option
                    v-for="(item, index) in data.promisers"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </span>
          </li>
          <li><span>律师事务所</span>
            <span>
              <el-select v-model="lawFirms"  placeholder="请选择">
                <el-option
                  v-for="(item, index) in data.lawFirms"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </span></li>
            <li><span>会计师事务所</span>
              <span>
                <el-select v-model="accountantFirms"  placeholder="请选择">
                  <el-option
                    v-for="(item, index) in data.accountantFirms"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </span>
            </li>
          <li><span>律师费（万元）</span><span class="pad10 readonly"><input type="text" v-model="data.rateSetting.lawyerFee" readonly name="" value=""></span></li>
          <li><span>备注</span><span class="pad10"><input type="text" name="" value=""></span></li>
        </ul>
      </div>
    </div>
  </div>
  <div slot="footer"><a class="button"  @click="packagedClaim()">提交</a></div>
</hsy-dialog>
</template>
<script>
import AdService from '@/services/ad.service'
import cookie from 'arale-cookie'

export default {
  data() {
    return {
      info: {},
      value: '',
      list: [],
      data: {},
      lawFirms: '', // 律师事务所
      accountantFirms: '', // 会计师事务所
      promisers: '', // 差额支付承诺人
      ratingOrganisations: '', // 资产评级机构
      spvs: '', // 信托机构
      payType: '', // 支付方式
      // subscriber: '', // 项目规模
      productType: '', // 产品类型
      subscriber1: '',
      subscriber2: '',
      subscriber3: '',
      isActive_1: false,
      isActive_2: false,
      isActive_3: true,
      subscriber: '',
      productName: '',
      productSize: '',
      basicAsset: '',
      spvRate: '', // 信托管理费
      ratingRate: '', // 资产评级费
      lawyerMoney: '', // 律师费
      accountantMoney: '', // 会计费
      expectedProfitRate: '15',
      selList: ['zq201709050003', 'zq201709050004'],
      options: [
        {
          name: '选项1',
          label: '黄金糕'
        },
        {
          name: '选项1',
          label: '黄金糕'
        },
        {
          name: '选项1',
          label: '黄金糕'
        }
      ]
    }
  },
  props: {
    adverInfo: {
      type: Object
    },
    packInfo: {
      type: Object
    }
  },
  created() {
    this.AdService = new AdService()
  },
  mounted() {
    this.initialOptions()
  },
  computed: {
    sourceName() {
      return this.$route.params.sourceType
    }
  },
  watch: {
    'adverInfo.adId' () {
    }
  },
  methods: {
    goAdverFullAdd(info) {
      this.$router.push('/adver/' + this.sourceName + '/edit/' + info.adId)
    },
    assetStatus(item) {
      if (item === 1) {
        if (this.isActive_1) {
          this.isActive_1 = false
        } else {
          this.isActive_1 = true
        }
      }
      if (item === 2) {
        if (this.isActive_2) {
          this.isActive_2 = false
        } else {
          this.isActive_2 = true
        }
      }
      if (item === 3) {
        if (this.isActive_3) {
          this.isActive_3 = false
        } else {
          this.isActive_3 = true
        }
      }
    },
    async initialOptions() {
      let self = this
      let res = await this.AdService.initialOptions(cookie.get('access_token'))
      self.data = res
      self.data.payType = [
        {
          name: '按月支付'
        },
        {
          name: '按季支付'
        }
      ]
      self.data.productType = [
        {
          name: '信托计划'
        }
      ]
      self.data.subscriber = [
        {
          name: '121212',
          index: 'subscriber1'
        },
        {
          name: '121212',
          index: 'subscriber2'
        },
        {
          name: '121212',
          index: 'subscriber3'
        }
      ]
    },
    async packagedClaim () {
      if (this.productName === '') {
        this.$notify.warning('请填写产品名称')
        return
      }
      if (this.productType === '') {
        this.$notify.warning('请填写产品类型')
        return
      }
      if (this.basicAsset === '') {
        this.$notify.warning('请填写基础资产')
        return
      }
      if (this.productSize === '') {
        this.$notify.warning('请填写项目规模')
        return
      }
      let params = {
        'productName': this.productName,
        'productType': this.productType,
        'basicAsset': this.basicAsset,
        'productSize': this.productSize,
        'creditor': '钱包金服',
        'posteriorSubscriber': '钱包金服',
        'expectedProfitRate': this.expectedProfitRate,
        'paymentWay': this.payType,
        'spv': this.spvs,
        'ratingRate': this.data.rateSetting.ratingRate,
        'spvRate': this.data.rateSetting.spvRate,

        'lawyerMoney': this.data.rateSetting.lawyerFee,
        'accountantMoney': this.data.rateSetting.accountantFee,

        'differencePaymentPromiser': this.promisers,
        'ratingOrganisation': this.ratingOrganisations,

        'accountingFirm': this.accountantFirms,
        'lawFirm': this.lawFirms,
        'debtsNumbers': this.adverInfo.selList
      }
      let res = await this.AdService.packagedClaim(params, cookie.get('access_token'))
      this.adverInfo.visible = false
      this.adverInfo.isActive = false
      this.$notify.success(res)
      this.$emit('getReList')
    },
    updateVisible() {
      this.$emit('updateVisible', false)
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
    &:after,
    &:before {
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
.main-over {
    width: 100%;
    padding: 0 58px 0 42px;
    box-sizing: border-box;
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
                display: table-cell;
                width: 49%;
                .el-select {
                    width: 100%;
                    height: 100%;
                }
                &:nth-child(1) {
                    text-align: right;
                    color: $primary-font3;
                    font-weight: medium;
                    padding-right: 10px;
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

.btn-item {
    display: inline-block;
    box-sizing: border-box;
    padding-right: 0;
    margin-top: 16px;
    font-size: 0;
    min-width: 160px;
}

label {
    width: 100px;
    padding-right: 5px;
    line-height: 26px;
    &:nth-of-type(2n+4) {
        padding-right: 0;
    }
}
.cbx,
label {
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
    &:nth-of-type(1),
    &:nth-of-type(2) {
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
.project-size {
    height: 101px;
    background-color: #FFFBF4;
    margin: 0 58px 0 42px;
    border: 1px solid #F1F8F9;
    padding: 11px 34px;
    display: flex;
    p {
        width: 100px;
        margin-top: 10px;
        text-align: right;
    }
    ul {
        flex: 1;
    }
    li {
        height: 34px;
        float: left;
        padding-left: 30px;
        margin: 5px 0;
        i {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 1px solid #eee;
            box-sizing: border-box;
            background: #fff;
            margin-right: 6px;
        }
        i.dui {
            background: url("../../../assets/img/icon/duigou.png") no-repeat center;
            background-size: contain;
        }
    }
    li:nth-child(even) {
        i {
            // margin-left: 56px;
        }
    }
}
.el-select {
    width: 150px;
}
.readonly {
  background-color: #eee;
}

</style>
