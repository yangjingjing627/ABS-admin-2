<template>
  <div class="side-bar">
    <form class="" action="index.html" method="post">
      <input class="searchAll" type="text" name="" placeholder="搜索" value="">
    </form>
    <ul>
      <li class="title">债权管理
      </li>
      <li :class="{'active': selectName === 'adversettle'}">
        <router-link to="/adver/settle/list">
          债权池操作
        </router-link>
      </li>
      <li :class="{'active': selectName === 'adverfull'}">
        <router-link to="/adver/full/list">
          债权查询
        </router-link>
      </li>
    </ul>
    <ul>
      <li class="title title_asset"  :class="{'active': selectName === 'assetall'}">
        <router-link to="/asset/all/list">
          资产管理
        </router-link>
      </li>
      <li :class="{'active': selectName === 'assetdetail'}">
        <router-link to="/asset/detail/list">
          资产详情
        </router-link>
      </li>
      <li :class="{'active': selectName === 'assetlink'}">
        <router-link to="/asset/link">
          协议链接
        </router-link>
      </li>
    </ul>
    <ul>
      <li class="title">用户管理
      </li>
      <li :class="{'active': selectName === 'userinfo'}">
        <i></i>
        <router-link to="/user/info/list">
          用户信息
        </router-link>
      </li>
      <li :class="{'active': selectName === 'dealrecord'}">
        <router-link to="/deal/record/list">
          交易记录
        </router-link>
      </li>
    </ul>
    <ul>
      <li class="title">系统设置
      </li>
      <li :class="{'active': selectName === 'otheragreements'}">
        <router-link to="/other/agreements/list">
          其他协议
        </router-link>
      </li>
      <li :class="{'active': selectName === 'ratesetting'}">
        <router-link to="/rate/setting/list">
          费率设置
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      selectName: 'adversettle'
    }
  },
  mounted () {
    let pathname = window.location.pathname
    this.selectName = pathname.substr(1) ? pathname.substr(1).split('/')[0] + pathname.substr(1).split('/')[1] : 'adversettle'
  },
  watch: {
    '$route' (to) {
      this.selectName = to.path.substr(1).split('/')[0] + to.path.substr(1).split('/')[1]
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.side-bar{
  width: $side-width;
  height: 100%;
  background: $sidebar-bg;
  form {
    width: 190px;
    height: 60px;
    border-bottom: 1px solid #3D4157;
    padding-top: 12px;
    input::-webkit-input-placeholder{
      color: #fff;
    }
    .searchAll {
      margin: 0px auto;
      display: block;
      width: 160px;
      height: 36px;
      border-radius: 100px;
      color: #fff;
      padding-left: 43px;
      box-sizing: border-box;
      background: #000 url(../../assets/img/icon/search.png) no-repeat 14px center;
    }
  }
  ul{
    display: block;
    width: 100%;
    text-align: center;
    li{
      width: 100%;
      height: 46px;
      color: $primary-font;
      line-height: 46px;
      cursor: pointer;
      font-weight: 100;
      border-bottom: 1px solid #3D4157;
      box-sizing: border-box;
      a{
        display: block;
        width: 100%;
        height: 100%;
        font-weight: 100;
        position: absolute;
      }
      &.title_asset {
        a {
          left: 0;
          padding-left: 45px;
        }
      }
      &.title{
        font-size: 18px;
        line-height: 46px;
        position: relative;
        padding-left: 45px;
        text-align: left;
      }
      &:not(.title) {
        background: url(../../assets/img/icon/twolevel_arrow/right.png) no-repeat 45px center;
      }
      &.active{
        background: #7D4C4A url(../../assets/img/icon/twolevel_arrow/down.png) no-repeat 45px center;
        color: #fff;
        position: relative;
        border-left: 3px solid #FF7067;
      }
    }
  }

  ul:nth-child(2) {
    li.title {
      background: url(../../assets/img/icon/load.png) no-repeat 22px center, url(../../assets/img/icon/onelevel_arrow/down.png) no-repeat 157px center;
    }
  }
  ul:nth-child(3) {
    li.title {
      background: url(../../assets/img/icon/asset_ad.png) no-repeat 22px center, url(../../assets/img/icon/onelevel_arrow/down.png) no-repeat 157px center;
    }
  }
  ul:nth-child(4) {
    li.title {
      background: url(../../assets/img/icon/usr.png) no-repeat 22px center, url(../../assets/img/icon/onelevel_arrow/down.png) no-repeat 157px center;
    }
  }
  ul:nth-child(5) {
    li.title {
      background: url(../../assets/img/icon/setting.png) no-repeat 22px center, url(../../assets/img/icon/onelevel_arrow/down.png) no-repeat 157px center;
    }
  }
}
</style>
