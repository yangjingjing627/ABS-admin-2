<template>
  <div class="hsy-pages" v-if="total > 0">
    <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total" :current-page="page">
    </el-pagination>
    <div class="all-total">
      每页显示{{ pageSize }}条  共计{{ total }}条数据
    </div>
</div>
</template>
<script>
export default {
  name: 'hsy-pagination',
  data() {
    return {
    }
  },
  computed: {
  },
  props: {
    total: {
      default: 0
    },
    page: {
      default: 1
    },
    pageSize: {
      default: 20
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('hsyCurrentChange', val)
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
.hsy-pages{
  text-align: center;
	margin-top: 40px;
	.all-total{
		text-align: center;
		color: #999;
		line-height: 20px;
		font-size: 14px;
		margin-top: 15px;
	}
	.el-pagination{
	 	color: #555;
	 	font-size: 16px;
		button:hover {
    color: $primary-font;
	}
	.btn-next{
		margin-left: 10px;
	}
	.btn-prev{
		margin-right: 10px;
	}
	.btn-next,.btn-prev{
		color: $primary-font;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
		width: 34px;
		height: 34px;
	}
	.el-pager {
		li{
			height: 34px;
			line-height: 34px;
			margin-left: 10px;
			padding: 0 15px;
			border: 1px solid $border-color;
			border-radius: 4px;
		}
		li:hover {
	    color: $primary-font;
		}
		li.btn-quicknext,li.btn-quickprev {
    line-height: 34px;
    color: #555;
		border: none;
	}
	li.active {
    border-color: $primary-font;
    background-color: $primary-font;
    color: #fff;
    cursor: default;
}
	}

 }
}
</style>
