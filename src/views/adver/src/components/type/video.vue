<template>
<div class="adver-model adver-model-type">
  <i class="remarks">支持mp4, m4v, 3gp, avi</i>
  <el-upload
  class="avatar-uploader"
  :action="url"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  name="file"
  :before-upload="beforeAvatarUpload">
  <video v-if="imageUrl" :src="imageUrl" class="avatar"></video>
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  <hsy-loading v-if="loading"></hsy-loading>
</el-upload>
<div class="info" v-if="fileName && imageUrl">
  <span>视频名称：
    <a class="name" :href="imageUrl" target="_blank">{{ fileName }}</a>
    <a @click="deleteVideo">删除</a>
  </span>
  <!-- <span>视频名称：
    <a class="name" :href="imageUrl" target="_blank">{{ fileName }}</a>
  </span> -->
  <span>视频长度：{{ playLength }}s</span>
</div>
<div class="set-time">
  <hsy-input type="number" v-model="times">连续轮播</hsy-input><i>次</i>
  <i class="remarks">每次连续播放次数</i>
</div>
</div>
</template>
<script>
import { API_HOST } from '@/config/global.config'

export default {
  data() {
    return {
      imageUrl: '',
      times: 1,
      playLength: 0,
      loading: false,
      fileName: ''
    }
  },
  computed: {
    url () {
      return API_HOST + 'admin/ad/source/upload'
    }
  },
  props: ['typeInfo'],
  mounted() {
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.loading = false
      if (res.code === '0') {
        this.imageUrl = res.data.url
        this.playLength = res.data.playLength
        this.fileName = file.name
        this.$emit('getVideoparams', this.imageUrl, this.playLength, this.times, this.fileName)
      } else {
        this.$message.error('视频上传失败')
      }
    },
    beforeAvatarUpload(file) {
      const isType = file.type === 'video/mp4' || file.type === 'video/m4v' || file.type === 'video/3gpp' || file.type === 'video/avi'
      if (!isType) {
        this.$message.error('上传视频格式不正确')
      }
      if (isType) {
        this.loading = true
      }
      return isType
    },
    deleteVideo () {
      this.imageUrl = ''
      this.playLength = 0
      this.fileName = ''
    }
  },
  watch: {
    'times' (val) {
      this.$emit('getVideoparams', this.imageUrl, this.playLength, val, this.fileName)
    },
    'imageUrl' (val) {
      this.$emit('getVideoparams', val, this.playLength, this.time, this.fileName)
    },
    'typeInfo' (val) {
      console.log(val)
      this.imageUrl = val.adUrl
      this.times = val.repeatTimes || this.times
      this.playLength = val.playLength || this.playLength
      this.fileName = val.fileName || this.fileName
    }
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
.adver-model-type{
  .video-uploader{
    .button{
      display: inline-block;
    }
  }
  .info{
    span{
      display: block;
      line-height: 20px;
      padding-top: 25px;
      a{
        color: $primary-font;
        margin-right: 16px;
        &.name{
          text-decoration:underline;
        }
      }
    }
  }
  .set-time{
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
    .header-input{
      float: left;
      margin-right: 10px;
      .hsy-input {
        width: 120px;
      }
    }
  }
  .remarks{
  }
}
</style>
