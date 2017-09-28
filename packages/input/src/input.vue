<template>
<div class="header-input">
  <label class="input-label" v-if="viewLabel" >
    <slot></slot>
  </label>
  <div class="hsy-input">
      <template>
        <input @change="$emit('change', currentValue)"
          ref="input"
          class="text-input "
          :placeholder="placeholder"
          :number="type === 'number'"
          :type="type"
          :disabled="disabled"
          :maxlength="maxlength"
          :readonly="readonly"
          :value="currentValue"
          @input="handleInput"
          :min="type === 'number'?1: undefined">
      </template>
    </div>
    <div class="clear">
    </div>
</div>
</template>
<script>
export default {
  name: 'hsy-input',
  data() {
    return {
      viewLabel: true,
      currentValue: this.value
    }
  },
  props: {
    value: {},
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    maxlength: {},
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    handleInput(e) {
      this.currentValue = e.target.value
    },
    handleClear() {
      if (this.disabled || this.readonly) return
      this.currentValue = ''
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
.header-input{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: $font-color;
  label{
    display: block;
    padding-right: 13px;
    float: left;
  }
  .hsy-input{
    padding: 7px;
    height: 30px;
    width: 220px;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
    float: left;
    input{
      height: 15px;
      line-height: 15px;
      width: 100%;
      display: block;
    }
  }
}
</style>
