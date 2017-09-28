import Login from './src/login.vue'
export default function(router) {
  /**
  * 登录
  * 登录
  */
  router.push({
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  })
}
