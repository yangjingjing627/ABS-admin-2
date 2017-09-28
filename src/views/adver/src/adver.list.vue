<template>
  <div class="list">
    <div class="header-search">
      <hsy-select :options="types" v-model="params.adType">所属平台:</hsy-select>
      <div class="r-search" :options="types">
        <b>创建时间：</b>
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          placeholder="选择时间范围">
        </el-date-picker>
        <div @click="search" class="search"></div>
      </div>
    </div>
    <div class="submit">
      <input type="button" name="" value="债权打包" @click="adEdit()">
      <input type="button" name="" value="获取债权" @click="getMoreDebt(debtMoreNum)">
    </div>
    <div class="table-list">
      <ul class="table-ul-common">
        <li v-if="isActive" class="width1300">已选中{{ list.length }}笔资产{{ totalSum }}总计元</li>
        <li id="header">
          <span @click="demo"><i v-bind:class="{ dui: isActive }"></i></span>
          <span>序号</span>
          <span>所属平台</span>
          <span>债券编号</span>
          <span>债权ID</span>
          <span>借款编号</span>

          <span v-if="!isFull">借款金额（元）</span>
          <span>借款利率（%）</span>
          <span>借款期限</span>
          <span>还款方式</span>
          <span>借款用途</span>

          <span>审核状态</span>
          <span>备注</span>
          <span>创建时间</span>
          <span>更新时间</span>
          <span>操作</span>
        </li>
        <li v-for="(item, index) in list" v-bind:class="{ assettatus: item.isSel }">
          <span  @click="assetStatus(item)"><i></i></span>
          <span>{{ index + 1 }}</span>
          <span>{{ item.debtID }}</span>
          <span>{{ item.debtNumber }}</span>
          <span>{{ item.platform }}</span>
          <span>{{ item.loanNumber }}</span>
          <span>{{ item.loanMoney }}</span>
          <span>
            <a>
              {{ item.loanRate }}
            </a>
          </span>
          <span>{{ item.loanTerm }}</span>
          <span>{{ item.repaymentWay }}</span>
          <span>{{ item.loanUse }}</span>
          <span>{{ item.state }}</span>

          <span>{{ item.comment }}</span>
          <span>{{ item.createTime }}</span>
          <span>{{ item.modifyTime }}</span>
          <span class="operation">
            <a @click="check(item)">详情</a>
            <a @click="modify(item.debtNumber)">退回</a>
          </span>
        </li>
      </ul>
    </div>

    <hsy-pagination
    :total="total"
    :pageSize="params.size"
    :page="params.page"
    :selList="selList"
    @hsyCurrentChange="currentChange"></hsy-pagination>
    <adver-info :adverInfo="adverInfo" :packInfo="packInfo" v-on:getReList="getList" v-on:updateVisible="updateVisible"></adver-info>
    <hsy-loading v-if="loading"></hsy-loading>

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
      isActive: false,
      demos: true,
      debtMoreNum: 10,
      selList: [],
      dateRange: [],
      totalSum: 0,
      loading: false,
      params: {
        length: 10,
        page: 1,
        startDate: '',
        endDate: ''
      },
      list: [],
      ...value,
      adverInfo: {
        dialogTitle: '打包债券',
        visible: false,
        adId: undefined,
        sourceType: '',
        isActive: false,
        selList: []
      },
      packInfo: {
        dialogTitle: '已完成打包，可在资产管理页面查询！',
        visible: false,
        button: '确定'
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
  created() {
    this.AdService = new AdService()
  },
  mounted() {
    this.getList()
  },
  methods: {
    demo () {
      let self = this
      if (self.isActive) {
        self.isActive = false
      } else {
        self.isActive = true
      }
      if (this.isActive) {
        this.totalSum = 0
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].isSel = true
          this.totalSum = this.totalSum + this.list[i].loanMoney
        }
      } else {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].isSel = false
          this.totalSum = 0
        }
      }
    },
    async getMoreDebt (debtMoreNum) {
      let self = this
      let res = await this.AdService.getNewdebts({number: debtMoreNum})
      for (let key in res) {
        res[key].isSel = false
      }
      this.isActive = false
      self.list = self.list.concat(res)
    },

    async getList () {
      let self = this
      let res = await this.AdService.getAllunrevieweddebts(this.params)
      for (let key in res.debts) {
        res.debts[key].isSel = false
      }
      self.list = res.debts
    },
    search () { // 点击搜索按钮获取时间的起始和结束
      console.log('this.dateRange, ' + this.dateRange)
      this.params.startDate = this.formatDate(this.dateRange[0])
      this.params.endDate = this.formatDate(this.dateRange[1])
      this.getList()
    },
    formatDate (date) { // 日期格式转化
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
    adEdit() {
      let self = this
      self.selList = []
      self.totalSum = 0
      self.showSelList = false
      self.showTotalSum = false
      for (let key in self.list) {
        if (self.list[key].isSel) {
          self.selList.push(self.list[key].debtNumber)
          self.totalSum = self.totalSum + self.list[key].loanMoney
        }
      }
      self.adverInfo.selList = self.adverInfo.selList.concat(self.selList)
      if (self.selList.length > 0) {
        self.showSelList = true
      } else {
        self.showSelList = false
      }
      // if (self.totalSum > 1000000000) {
      //   self.showTotalSum = true
      // } else {
      //   self.showTotalSum = false
      // }
      // if (!self.showSelList) {
      //   this.$notify.error('请选择债券')
      // }
      // if (!self.showTotalSum) {
      //   this.$notify.error('每次获取债权数量不得小于1000000000')
      // }
      // if (self.showSelList && self.showTotalSum) {
      this.adverInfo.visible = true
      this.isActive = false
      // }
    },
    updateVisible(flag) {
      this.adverInfo.visible = flag
    },
    check (item) {
      this.$router.push('/adver/settle/check?adId=' + item.loanTerm)
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
      await this.AdService.getDebt({'state': '已退回', 'debtNumber': item})
      this.$notify.success('退回成功')
      this.getList()
    },
    assetStatus (item) {
      let self = this
      let everySel = 0
      if (item.isSel) {
        item.isSel = false
      } else {
        item.isSel = true
      }
      this.list.forEach(function(e) {
        if (e.isSel) {
          everySel++
        }
      })
      if (everySel === this.list.length) {
        self.isActive = true
      } else {
        self.isActive = false
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
.header-search {
  height: 58px;
  .r-search {
    display: flex;
    float: right;
    padding-right: 5px;
    b {
      display: block;
      min-width: 10px;
      height: 100%;
      line-height: 34px;
    }
  }
}
.search {
  width: 34px;
  height: 34px;
  background: url(../../../assets/img/icon/search.png) no-repeat center;
  background-size: 14px 14px;
  background-color: $topic-color;
  margin-left: 13px;
}
.table-ul-common{
  li{
    color: #666666;
    border: 1px solid #F9F9F9;
    box-sizing: border-box;
    span{
      word-break: break-all;
      text-align: center;
      a{
        color: #666666;
      }
      i {
        display: table-cell;
        width: 16px;
        height: 16px;
        border: 1px solid #eee;
        box-sizing: border-box;

      }
    }
    span:nth-child(1) {
      width: 3%
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
      width: 10%
    }
    span:nth-child(8) {
      width: 8%
    }
    span:nth-child(9) {
      width: 6%
    }
    span:nth-child(10) {
      width: 6%
    }
    span:nth-child(11) {
      width: 6%
    }
    span:nth-child(12) {
      width: 6%
    }
    span:nth-child(13) {
      width: 6%
    }
    span:nth-child(14) {
      width: 6%
    }
    span:nth-child(15) {
      width: 8%
    }
  }
  .assettatus {
    background-color: $list-checked-bg;
    span:nth-child(1) i {
      background: url(../../../assets/img/icon/duigou.png) no-repeat center;
      background-size: contain;
    }
  }
}
.submit {
  min-width: 1300px;
  height: 62px;
  padding: 14px 30px 14px 0;
  background-color: #F9F9F9;
  input {
    display: block;
    float: right;
    width: 100px;
    height: 34;
    margin-left: 7px;
    line-height: 34px;
    background-color: $topic-color;
    border-radius: 4px;
    color: #fff;
  }
}
.dome {
  width: 200px;
  height: 40px;
  background-color: tan;
}
.active {
  background-color: #f66;
}
.dui {
  background: url(../../../assets/img/icon/duigou.png) no-repeat center;
  background-size: contain;
}
</style>
