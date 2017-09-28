import goback from './src/goback.vue'

goback.install = function(Vue) {
  Vue.component(goback.name, goback)
}

export default goback
