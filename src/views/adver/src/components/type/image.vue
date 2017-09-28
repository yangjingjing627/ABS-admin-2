<template>
<div class="adver-model adver-model-type">
  <i class="remarks">建议985*768像素，支持jpg,png,gif,bmp</i>
  <el-upload
  class="avatar-uploader"
  :action="url"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  name="file"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  <hsy-loading v-if="loading"></hsy-loading>
</el-upload>
<div class="set-time">
  <hsy-input type="number" v-model="time">播放时长</hsy-input><i>秒</i>
</div>
</div>
</template>
<script>
import { API_HOST } from '@/config/global.config'

export default {
  data() {
    return {
      imageUrl: '',
      time: 5,
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
    // this.imageUrl = this.getimageUrl
    // this.time = this.getTime
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.loading = false
      if (res.code === '0') {
        this.imageUrl = res.data.url
        this.fileName = file.name
        this.$emit('getImgparams', this.imageUrl, this.time, this.fileName)
      } else {
        if (res.message) {
          this.$message.error(res.message)
        } else {
          this.$message.error('上传失败')
        }
      }
    },
    beforeAvatarUpload(file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp'
      if (!isType) {
        this.$message.error('上传图片格式不正确')
      }
      if (isType) {
        this.loading = true
      }
      return isType
    }
  },
  watch: {
    'time' (val) {
      this.$emit('getImgparams', this.imageUrl, val, this.fileName)
    },
    'imageUrl' (val) {
      this.$emit('getImgparams', val, this.time, this.fileName)
    },
    'typeInfo' (val) {
      this.imageUrl = val.adUrl
      this.time = val.playLength || this.time
    }
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
.adver-model-type{
  width: 365px;
  padding: 10px;
  .el-loading-mask.is-fullscreen {
    position: absolute;
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
    font-size: 12px;
    color: #CBCBCB;
    letter-spacing: 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed $border-color;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: $primary-font;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 174px;
    height: 136px;
    line-height: 136px;
    text-align: center;
    border-radius: 4px;
  }
  .avatar {
    width: 174px;
    height: 136px;
    display: block;
  }
}
</style>
