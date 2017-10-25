<template>
  <div class="list">
    <div class="header-search header-search-eee">
      <input @click="setUser" type="button" name="" value="创建用户">
    </div>
    <div class="table-list">
      <ul class="table-ul-common">
        <li id="header-15">
          <span>用户名称</span>
          <span>用户类型</span>
          <span>代币账户</span>
          <span>创建时间</span>
          <span>用户名</span>
          <span>操作</span>
        </li>
        <li v-for="(item, index) in list">
          <span>{{ item.companyName }}</span>
          <span>{{ item.companyType }}</span>
          <span>{{ item.account }}</span>
          <span>{{ item.createTime }}</span>
          <span>{{ item.username }}</span>
          <span class="blue" @click="operate(item.userID)">操作日志</span>
        </li>
      </ul>
    </div>
    <hsy-pagination
    :total="total"
    :pageSize="params.size"
    :page="params.page"
    @hsyCurrentChange="currentChange"></hsy-pagination>
    <create-user :creatUsrInfo="creatUsrInfo" v-on:getList="getList" v-on:updateVisible="updateVisible"></create-user>
    <operation-log :operationLog="operationLog" :logData="logData" v-on:getList="getList" v-on:logVisible="logVisible"></operation-log>
  </div>
</template>
<script>
import { value } from './adver.list.js'
import cookie from 'arale-cookie'
import AdService from '@/services/ad.service'
import CreateUser from './create.user.vue'
import OperationLog from './operation.log.vue'

export default {
  data() {
    return {
      visible2: false,
      popover4: {},
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
      creatUsrInfo: {
        dialogTitle: '创建新用户',
        visible: false
      },
      operationLog: {
        visible: false,
        userID: 0
      },
      logData: {
        tableData: [
          {
            createTime: '2016-05-02',
            userID: '王小虎',
            action: '上海市普陀区金沙江路 1518 弄'
          }, {
            createTime: '2016-05-04',
            userID: '王小虎',
            action: '上海市普陀区金沙江路 1517 弄'
          }, {
            createTime: '2016-05-01',
            userID: '王小虎',
            action: '上海市普陀区金沙江路 1519 弄'
          }, {
            createTime: '2016-05-03',
            userID: '王小虎',
            action: '上海市普陀区金沙江路 1516 弄'
          }
        ]
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
      let res = await this.AdService.users(cookie.get('access_token'))
      self.list = res
    },
    async setUser () {
      this.creatUsrInfo.visible = true
    },
    async operate (userID) {
      this.operationLog.visible = true
      this.operationLog.userID = userID
      console.log('userID, ' + this.operationLog.userID)
      let res = await this.AdService.optUser({'userID': this.operationLog.userID}, cookie.get('access_token'))
      this.logData.tableData = res
    },
    search () {
      this.getList()
    },
    currentChange (val) {
      this.params.page = val
      this.getList()
    },
    updateVisible (flag) {
      this.creatUsrInfo.visible = flag
    },
    logVisible (flag) {
      this.operationLog.visible = flag
    },
    check (item) {
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
    CreateUser,
    OperationLog
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
  }
}
.header-search-eee {
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
  cursor: pointer;
}
</style>
