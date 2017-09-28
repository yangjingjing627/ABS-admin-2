<template>
<div class="header-select">
  <label class="input-label" v-if="viewLabel" >
    <slot></slot>
  </label>
  <div class="hsy-select">
    <el-select v-model="value" placeholder="请选择" @change ="changeValue" ref="select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!-- <template>
      </template> -->
    </div>
    <div class="clear">
    </div>
</div>
</template>
<script>
export default {
  name: 'hsy-select',
  data() {
    return {
      viewLabel: true,
      currentValue: this.value,
      value: 0
    }
  },
  props: {
    selectValue: String,
    options: {
      type: Array,
      default: []
    }
  },
  methods: {
    changeValue(val) {
      this.currentValue = val
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
    },
    '$route' () {
      this.value = 0
      this.$emit('input', 0)
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
.header-select{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: $font-color;
  label{
    display: block;
    padding-right: 13px;
    float: left;
  }
  .hsy-select{
    height: 38px;
    width: 270px;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
    float: left;
    .el-select{
      width: 100%;
      height: 100%;
    }
    .el-select .el-input .el-input__icon {
      color: #8E8E8E;
    }
    .el-input__inner{
      border: none;
      height: 34px;
      text-align: left;
      padding-left: 15px;
    }
    .el-input__inner:hover {
      border-color: none;
    }
  }
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  background-color: #fff;
  position: relative;
  &:after{
    position: absolute;
    content: "";
    width: 2px;
    height: 20px;
    top: 5;
    left: 0;
    background: $primary;
  }
}
.el-select-dropdown__item {
    padding: 6px 10px;
    color: $font-color;
    height: 30px;
    box-sizing: border-box;
    cursor: pointer;
}
.el-select-dropdown__item.selected.hover {
  background-color: #fff;
  color: $font-color;
  &:after{
    position: absolute;
    content: "";
    width: 2px;
    height: 20px;
    top: 5;
    left: 0;
    background: $primary;
  }
}
.el-select-dropdown__item.selected {
  color: $font-color;
  background-color: $danger;
}
.el-select-dropdown__item.selected.hover {
    color: $font-color;
    background-color: $danger;
}
.el-select-dropdown {
    border: 1px solid #DEDEDE;
    border-radius: 2px;
    background-color: #fff;
    box-sizing: border-box;
    margin: 5px 0;
    background: #FFFFFF;
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.10);
}
</style>
