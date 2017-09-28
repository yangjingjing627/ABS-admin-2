<template>
<hsy-dialog v-if="operationLog.visible" :visible="operationLog.visible" v-on:logVisible="logVisible">
  <div slot="main" id="operationLog">
    <el-table
    :data="logData.tableData"
    stripe
    style="width: 100%">
    <el-table-column
      align="center"
      prop="createTime"
      label="时间"
      width="180">
    </el-table-column>
    <el-table-column
      align="center"
      prop="userID"
      label="操作"
      width="180">
    </el-table-column>
    <el-table-column
      align="center"
      prop="action"
      label="用户名">
    </el-table-column>
  </el-table>
  </div>
  <div slot="footer"><a class="button"  @click="close()">返回</a></div>
</hsy-dialog>
</template>
<script>
import AdService from '@/services/ad.service'
export default {
  data() {
    return {
    }
  },
  props: {
    operationLog: {
      type: Object
    },
    logData: {
      type: Object
    }
  },
  created() {
    this.AdService = new AdService()
  },
  mounted() {
  },
  methods: {
    close () {
      this.operationLog.visible = false
      this.$emit('getList')
    },
    logVisible() {
      this.$emit('logVisible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
  #operationLog .el-table th>.cell {
    text-align: center;
  }
</style>
