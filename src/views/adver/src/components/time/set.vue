<template>
<div class="adver-model adver-time-set">
  <ul>
    <li v-for="item,index in list">
      <el-time-select
        placeholder="起始时间"
        v-model="item.timeStart"
        :picker-options="{
          start: '00:00',
          step: '00:10',
          end: '23:59'
        }">
      </el-time-select>
      <span class="zhi">至</span>
      <el-time-select
        placeholder="结束时间"
        v-model="item.timeEnd"
        :picker-options="{
          start: '00:00',
          step: '00:10',
          end: '23:59',
          minTime: item.timeStart
        }">
      </el-time-select>
      <a class="delete" v-if="index !== 0" @click="deleteTime(index)">删除</a>
    </li>
  </ul>
  <a class="button" @click="addTime">增加时段</a>
</div>
</template>
<script>
export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      list: []
    }
  },
  props: ['timeInfo'],
  mounted() {
    let li = [{timeStart: '', timeEnd: ''}]
    this.list = this.list.concat(li)
  },
  methods: {
    addTime () {
      if (this.list.length > 20) {
        this.$message.error('最多设置20个时段')
        return
      }
      let li = [{timeStart: '', timeEnd: ''}]
      this.list = this.list.concat(li)
    },
    deleteTime (index) {
      this.list.splice(index, 1)
    }
  },
  watch: {
    'list' (val) {
      this.$emit('timeSetFun', val)
    },
    'timeInfo' (val) {
      if (val.length > 0) {
        this.list = val
      }
    }
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
.adver-time-set{
  padding: 20px 13px;
  width: 415px;
  .button{
    margin-top: 15px;
  }
  .el-date-editor.el-input {
    width: 150px;
  }
  ul{
    li{
      margin-bottom: 10px;
      span.zhi{
        padding: 0 10px;
      }
      a.delete{
        color: $primary-font;
        padding-left: 10px;
      }
    }
  }
}
</style>
