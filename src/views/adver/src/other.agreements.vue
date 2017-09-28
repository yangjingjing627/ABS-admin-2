<template>
  <div class="list">
    <div class="header-search header-search-eee">
      相关分合作协议与资质
    </div>
    <form>
      <strong class="lable">相关分合作机构协议：</strong>
      <input type="button" name="" value="下载">
    </form>
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
  computed: {
    isFull () {
      return this.$route.params.sourceType === 'full'
    },
    sourceName () {
      console.log(this.$route.params.sourceType + '[============]')
      return this.$route.params.sourceType
    }
  },
  mounted() {
    this.AdService = new AdService()
    this.getList()
  },
  methods: {
    async getList () {
      if (this.isFull) {
        this.params.sourceType = 20
      } else {
        this.params.sourceType = 10
      }
    },
    search () {
      this.getList()
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
      width: 6%
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
      width: 6%
    }
  }
  .asset-tatus {
    background-color: $list-checked-bg;
    span:nth-child(1) i {
      background: url(../../../assets/img/icon/duigou.png) no-repeat center;
      background-size: contain;
    }
  }
}
.header-search-eee {
  height: 74px;
  font-weight: meduim;
  font-size: 24px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
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
}
form {
  margin-top: 56px;
  .lable {
    display: block;
    padding-right: 13px;
    float: left;
    line-height: 38px;
    font-size: 14px;
    font-weight: bold;
    margin-left: 26px;
  }
  input[type="text"] {
    display: block;
    height: 38px;
    width: 270px;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
    float: left;
    background-color: #fff;
    margin-right: 25px;
    height: 34px;
    text-align: left;
    padding-left: 15px;
    box-sizing: border-box;
  }
}
</style>
