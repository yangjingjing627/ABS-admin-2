<template>
  <div class="list">
    <div class="header-search">
      <hsy-select :options="types" v-model="params.adType">所属平台:</hsy-select>
      <hsy-select :options="ways" v-model="params.adType">状态:</hsy-select>
      <div class="r-search" :options="types" v-model="params.adType">
        <b>创建时间：</b>
        <el-date-picker
          v-model="value3"
          type="datetimerange"
          placeholder="选择时间范围">
        </el-date-picker>
        <div class="search"></div>
      </div>
    </div>
    <div class="table-list">
      <ul class="table-ul-common">
        <li id="header">
          <!-- <span @click="demo"><i v-bind:class="{ dui: isActive }"></i></span> -->
          <span>序号</span>
          <span>所属平台</span>
          <span>债券编号</span>
          <span>债权ID</span>
          <span>借款编号</span>

          <span>借款金额（元）</span>
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
        <li v-for="(item, index) in list"  @click="assetStatus(item)" v-bind:class="{ assettatus: item.isSel }">
          <!-- <span><i @click="assetStatus"></i></span> -->
          <span>{{ index + 1 }}</span>
          <span>{{ item.platform }}</span>
          <span>{{ item.debtID }}</span>
          <span>{{ item.debtNumber }}</span>
          <span>{{ item.loanNumber }}</span>
          <span>{{ item.loanMoney }}</span>
          <span>
            <a @click="adEdit(item.adId, item.adStatusDesc)">
              {{ item.loanRate }}
            </a>
          </span>

          <span>{{ item.loanTerm }}</span>
          <span>{{ item.repaymentWay }}</span>
          <span>{{ item.loanUse }}</span>
          <span>{{ item.state }}</span>

          <span v-if="item.comment">{{ item.comment }}</span>
          <span v-else>无</span>
          <span>{{ item.createTime }}</span>
          <span>{{ item.modifyTime }}</span>
          <span class="operation">
            <a @click="check(item)" v-if="item.adStatus !== 10">详情</a>
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
      value3: '',
      isActive: false,
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

  mounted() {
    this.AdService = new AdService()
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
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].isSel = true
        }
      } else {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].isSel = false
        }
      }
    },
    async getList () {
      let self = this
      let res = await this.AdService.alldebts({'page': 1, 'length': 20})
      for (let key in res.debts) {
        res.debts[key].isSel = false
      }
      self.list = res.debts
    },
    search () {
      this.getList()
    },
    currentChange (val) {
      this.params.page = val
      this.getList()
    },
    // add () {
    //   if (this.isFull) {
    //     this.$router.push('/adver/full/add')
    //   } else {
    //     this.$router.push('/adver/settle/add')
    //   }
    // },
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
      this.$router.push('/adver/settle/check?adId=' + item.adId)
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
    modify (item) {
      this.$router.push('/adver/' + this.sourceName + '/edit/' + item.adId)
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
  height: 83px;
  padding-bottom: 25px;
  .r-search {
    display: flex;
    padding-right: 30px;
    b {
      display: block;
      min-width: 10px;
      height: 100%;
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
.dui {
  background: url(../../../assets/img/icon/duigou.png) no-repeat center;
  background-size: contain;
}
</style>
