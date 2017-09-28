import Vue from 'vue'
import Router from 'vue-router'
import AuthRouter from '@/utils/auth.router'
import App from '@/views/app.vue'
import AdverRouter from '@/views/adver'
import LoginRouter from '@/views/login'

Vue.use(Router)

let routes = []

// 根路由
let rootRoutr = {
  path: '/',
  component: App,
  children: []
}

// 重定向路由
let redirectRoute = {
  path: '*',
  redirect: '/'
}

AdverRouter(rootRoutr.children)
LoginRouter(routes)

let authRouter = new AuthRouter()
let authRouters = authRouter.init(routes.concat([rootRoutr, redirectRoute]))

// 暂时不做路由区分
let mode = 'history'
export default new Router({
  mode: mode,
  routes: authRouters
})
