<template>
  <div class="top-bar">
    <div class="side">
      管理后台
    </div>
    <div class="user">
      <span><a @click="logout">退出登录</a></span>
    </div>
  </div>
</template>
<script>
import LoginService from '@/services/login.service.js'

export default {
  data: function () {
    return {
      active: true
    }
  },
  computed: {
    uName () {
      return this.$cookie.get('uName')
    }
  },
  created() {
    this.LoginService = new LoginService()
  },
  methods: {
    async logout () {
      await this.LoginService.logout({})
      this.$cookie.remove('access_token')
      this.$router.push('/login')
      window.location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
$iconImgUrl:'../../assets/img';

.top-bar{
  width: 100%;
  height: $top-height;
  background: $topbar-bg;
  position: relative;
  .user{
    position: absolute;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #555;
    top: 15px;
    right: 30px;
    span{
      display: inline-block;
      padding: 0 10px;
      padding-right: 30px;
      background: url(../../assets/img/icon/avatar.png) no-repeat right center;
      background-size: 30px 30px;
      a {
        margin-right: 7px;
      }
      a:hover{
        color: $primary-font;
      }
    }
  }
  .side{
    width: $side-width;
    height: 100%;
    background: $primary;
    color: #fff;
    font-size: 18px;
    line-height: 24px;
    padding: 20px 0 20px 20px;
    text-align: center;
    position: relative;
    &:after{
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      background: url(#{$iconImgUrl}/icon/icon.png) no-repeat;
      background-size: 20px;
      top: 22px;
      left: 20px;
    }
  }
}
</style>
