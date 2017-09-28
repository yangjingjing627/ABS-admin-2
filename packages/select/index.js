import select from './src/select.vue'

select.install = function(Vue) {
  Vue.component(select.name, select)
}

export default select
