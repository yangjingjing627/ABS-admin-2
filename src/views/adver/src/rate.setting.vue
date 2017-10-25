<template>
  <div class="check-result">
    <div class="main-over">
      <div class="main-info">
      <ul>
        <li><span>律师费（万元）：</span><input v-model="lawyerFee" type="text" name=""></li>
        <li><span>会计费：</span><input v-model="accountantFee" type="text" name="" value=""></li>
        <li><span>预期收益率（1%）：</span><input v-model="spvRate" type="text" name="" value=""></li>
        <li><span>信托费（1%）：</span><input v-model="ratingRate" type="text" name="" value=""></li>
        <input v-model="id" type="hidden" name="" value="">
      </ul>
      <input @click="editRate" type="button" name="" value="修改">
    </div>
    </div>
  </div>
</template>
<script>
import cookie from 'arale-cookie'
import AdService from '@/services/ad.service'
export default {
  data() {
    return {
      lawyerFee: 1,
      accountantFee: 100,
      spvRate: 12,
      ratingRate: 11,
      city: 'city',
      id: 1,
      report: 'report'
    }
  },
  mounted() {
    this.AdService = new AdService()
    this.getRate()
  },
  methods: {
    async getRate () {
      let self = this
      let res = await this.AdService.rateSetting(cookie.get('access_token'))
      self.lawyerFee = res.lawyerFee
      self.accountantFee = res.accountantFee
      self.spvRate = res.spvRate
      self.ratingRate = res.ratingRate
    },
    async editRate () {
      let self = this
      let params = {}
      params.lawyerFee = self.lawyerFee
      params.accountantFee = self.accountantFee
      params.spvRate = self.spvRate
      params.ratingRate = self.ratingRate
      params.id = self.id
      await this.AdService.editRate(params, cookie.get('access_token'))
      this.$notify.success('修改成功')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.check-result {
  width: 100%;
  .main-over {
    width: 100%;
    p {
      width: 100%;
      height: 54px;
      padding: 14px 0 14px 30px;
      background-color: $list-checked-bg;
      font-size: 24px;
    }
    .main-info {
      width: 100%;
      padding: 31px 0 0 71px;
      box-sizing: border-box;
    }
    ul {
      li {
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        margin-bottom: 20px;
        span {
          display: block;
          float: left;
          &:nth-child(1) {
            text-align: right;
            color: $primary-font3;
            width: 140px;
          }
        }
        input {
          display: block;
          width: 230px;
          height: 44px;
          text-align: left;
          color: $primary-font1;
          border: 1px solid $primary-font4;
          padding: 12px 32px 12px 16px;
          box-sizing: border-box;
          border: 1px solid #eee;
          border-radius: 4px;
        }
      }
    }
  }
}
input[type="button"] {
  display: block;
  width: 200px;
  height: 34px;
  border-radius: 10px;
  background-color: $topic-color;
  color: #fff;
  font-weight: normal;
}
</style>
