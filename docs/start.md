# 前端自动化相关

## 环境配置

* 安装node 环境

* [安装yarn](https://yarnpkg.com/zh-Hans/docs/install#mac-tab)

## npm install --global yarn

## 个人配置

* 端口号配置

> 见 __./config/index.js__  dev.port 默认是8000可根据个人情况修改但请勿提交

## 目录规范介绍

<pre>

.
├── build                          // webpack 脚步
├── config                         // 自动化配置相关
├── dist                           // 发布文件
├── docs                           // 项目文档
├── node_modules                   // 包文件
├── package                        // 三方引用组建 ，自定义通用组建
├── plugins                        // 通用全局js方法，cookie，session，localStorage等
├── scss                           // 全局通用css，三方组建css修改，rest等
├── src                            // 项目源文件
│    ├── assets                    // 本地图片
│    ├── base                      // 基础方法
│    ├── components                // 组件库
│    │    ├── action-sheet         // 单个组件
│    │    │    ├── src             // 源码
│    │    │    ├── index.js        // 对外暴露
│    │    │    └── README.md       // 单个组件文档接口在这
│    │    ├── goods.vue            // 单个组件
│    │    └── ...
│    ├── config                    // 项目配置
│    │   ├── global.config.js      // 项目全局配置
│    │   ├── router.config.js      // 路由配置根
│    │   ├── axios.config.js       // ajax请求配置
│    │   └── ...
│    ├── directives                // 通用指令
│    ├── scss                      // 自定义样式 通用函数
│    │    ├── utils.scss           // 通用的
│    │    └── ...
│    ├── services                  // 服务
│    ├── stores                    // vuex相关
│    ├── utils                     // 工具库
│    ├── views                     // 视图部分（理解为业务page）
│    │    ├── adver                // 单个业务
│    │    │    ├── src             // 源码
│    │    │    │    ├── .vue       // 业务页面
│    │    │    │    └── ...
│    │    │    └── index.js        // 业务路由
│    │    ├── app.vue
│    │    └── ...
│    ├── index.html                // 单个入口对外暴露的模板
│    ├── index.js                  // 单个入口
│    └── ...
├── static                         // 项目本身的静态资源
├── test                           // 测试...木错是测试
├── .babelrc                       // babel 编译配置
├── .editorconfig                  // 编辑器配置
├── .eslintignore                  // 不期望执行eslint 规范的文件
├── .eslintrc.js                   // eslint 配置见 eslint.org
├── .jsbeadutifyrc                 // vscode 插件配置使用别的编辑器的同学请忽略
├── .gitignore                     // git 排除不想提交的文件
├── package.json                   // 包文件 但是使用第三方资源请用yarn 安装
├── README.md                      // 项目入口介绍
├── yarn.lock                      // yarn 安装包
│
└──
.

</pre>


## 第三方

* 使用[element](http://element.eleme.io/#/component/notification) 使用方式 单个引入

* [sass](http://sass.bootcss.com/docs/sass-reference/#import)

* [vue](https://vuefe.cn/v2/guide/index.html)

* [vue-router](https://router.vuejs.org/zh-cn/)

* [vuex](http://vuex.vuejs.org/zh-cn/structure.html)

* [axios](https://github.com/mzabriskie/axios)
