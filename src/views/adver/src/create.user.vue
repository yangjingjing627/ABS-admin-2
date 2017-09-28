<template>
<hsy-dialog v-if="creatUsrInfo.visible" :visible="creatUsrInfo.visible" :title="creatUsrInfo.dialogTitle" v-on:updateVisible="updateVisible">
  <div slot="main">
  <form class="" action="index.html">
    <label for="">
      <span>用户名称：</span><input v-model="companyName" type="text" name="" value="" placeholder="请填写用户名称">
    </label>
    <label for="">
      <span>用户类型：</span>
      <span>
        <el-select v-model="companyType" placeholder="请选择用户类型">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </span>
    </label>
    <label for="">
      <span>代币账户：</span><input v-model="account" type="text" name="" value="" placeholder="请填写代币账户">
    </label>
    <label for="">
      <span>用户名：</span><input v-model="username" type="text" name="" value="" placeholder="请填写用户名">
    </label>
  </form>
  </div>
  <div slot="footer"><a class="button"  @click="setUser()">确定</a></div>
</hsy-dialog>
</template>
<script>
import AdService from '@/services/ad.service'
export default {
  data() {
    return {
      info: {},
      companyName: '',
      companyType: '',
      account: '',
      username: '',
      list: [],
      data: {},
      options: [
        {
          value: '选项1',
          label: '个体工商户1'
        }, {
          value: '选项2',
          label: '个体工商户2'
        }, {
          value: '选项3',
          label: '个体工商户3'
        }, {
          value: '选项4',
          label: '个体工商户4'
        }, {
          value: '选项5',
          label: '个体工商户5'
        }
      ]
    }
  },
  props: {
    creatUsrInfo: {
      type: Object
    }
  },
  created() {
    this.AdService = new AdService()
  },
  mounted() {
  },
  methods: {
    async setUser () {
      if (this.companyName === '') {
        this.$notify.warning('请填写用户名称')
        return
      }
      if (this.companyType === '') {
        this.$notify.warning('请填写用户类型')
        return
      }
      if (this.account === '') {
        this.$notify.warning('请填写代币账户')
        return
      }
      if (this.username === '') {
        this.$notify.warning('请填写用户名')
        return
      }
      let params = {
        'companyName': this.companyName,
        'companyType': this.companyType,
        'account': this.account,
        'username': this.username
      }
      let res = await this.AdService.setUser(params)
      this.$notify.success(res)
      this.creatUsrInfo.visible = false
      this.$emit('getList')
    },
    updateVisible() {
      this.$emit('updateVisible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
  form {
    padding: 50px;
    box-sizing: border-box;
    label {
      display: flex;
      margin: 0 auto;
      width: 400px;
      height: 40px;
      line-height: 40px;
      span, input {
        flex: 1;
      }
      el-select {
        width: 100%;
      }
      span {
        text-align: right;
      }
      input[type="text"] {
        box-sizing: border-box;
        border: 1px solid #eee;
      }
      .el-select {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
