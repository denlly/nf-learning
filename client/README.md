### 目录结构

- api 数据接口，ajax封装，翻译，常量等数据
- assets 前端 css、image、font 等静态资源
- components vue 组件
  - /base 各页面基础组件
- layouts nuxtjs 布局文件
- middleware nuxtjs 中间件文件
- pages nuxtjs 页面文件
- plugins nuxtjs 插件
- static 纯静态文件
- store vuex 目录

### Vue原型链挂载方法介绍
1. $http: axios直接挂载在$http上，可直接使用，无需每个文件引入axios
2. $math: 浮点数加减乘除，及其他运算（后期会持续迭代),见assets/js/math.js

### 页面结构命名
> 所有Vue文件均使用小写,多个单词之间使用 - 链接

##### Page目录结构如下

    - home ---- 主页 
    - product ---- 产品 
    - data-center ---- 数据中心 
    - blog ---- 博客 
    - about-us ---- 关于我们 
    - contact-us ---- 客服中心 
    - dashboard ---- 控制面板（单独为一层，方面权限控制） 
        - dashboard/dashboard ---- 控制面板 
        - dashboard/wallet ---- 钱包 
        - dashboard/my-order ---- 我的订单 
        - dashboard/message-center ---- 消息中心 
        - dashboard/extension ---- 推广 
        - dashboard/setting ---- 账户设置 
        - dashboard/purchasing-power ---- 购买算力 

##### Component目录结构如下

    - base ---- 插槽组件
    - indexPage ---- 主页
    - login ---- 登录
    - public ---- 公共Vue
    
