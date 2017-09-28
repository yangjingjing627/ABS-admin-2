<template>
  <div class="delay">
    <p>结算广告延迟时间：<i>{{ switchTime }}s</i></p>
    <button @click="editTime">修改</button>
  </div>
</template>
<script>
import AdDelayService from '@/services/ad.delay.service'

export default {
  data() {
    return {
      switchTime: 0
    }
  },
  mounted() {
    this.AdDelayService = new AdDelayService()
    this.getSwitchTimeEdit()
  },
  methods: {
    async getSwitchTimeEdit () {
      let res = await this.AdDelayService.getSwitchTimeEdit({})
      this.switchTime = res.switchTime
    },
    editTime () {
      this.$prompt('设置延时时间：', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'set-time',
        inputPattern: /^((\d{1,2})|(1[0-7]\d)|180)$/,
        inputErrorMessage: '0～180 整数'
      }).then(action => {
        this.postSwitchTimeEdit(parseInt(action.value))
      }).catch(() => {
      })
    },
    async postSwitchTimeEdit (value) {
      await this.AdDelayService.postSwitchTimeEdit({switchTime: value})
      this.getSwitchTimeEdit()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
.delay {
  p {
    margin: 73px 0 24px 28px;
    font-size: 14px;
    color: $primary-font;
    i {
      color: #252525;
    }
  }
  button {
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: #3DBCFC;
    border-radius: 4px;
    margin-left: 28px;
  }
}
</style>
