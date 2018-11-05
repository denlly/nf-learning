module.exports = {
  srcDir: 'client/',
  /*
   ** Headers of the page
   */
  head: {
    title: 'datafountain.cn',
    meta: [{
      charset: 'utf-8'
    },
      {
        hid: 'description',
        name: 'description',
        content: 'datafountain.datafountain.datafountain.datafountain.datafountain.datafountain.datafountain.datafountain.datafountain.'
      },
      {
        name: 'keywords',
        content: 'datafountain,数据科学,大数据,数据学习'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,user-scalable=no'
      },
      // google站长工具验证
      // {
      //     name: "google-site-verification",
      //     content: "PgIFPzcimGQqcrXoWMpmxW9RlY6D-XIJJt3ikGGX7Bc",
      // },
      // <!--360 使用Google Chrome Frame-->
      {
        name: 'renderer',
        content: 'webkit'
      },
      // <!--百度禁止转码-->
      {
        he: 'Cache-Control',
        content: 'no-siteapp'
      },
      // <!--优先使用 IE 最新版本和 Chrome-->
      {
        he: 'X-UA-Compatible',
        content: 'IE=edge,chrome=1'
      },
      // uc浏览器强制竖屏 测试
      {
        name: 'screen-orientation',
        content: 'portrait'
      },
      // QQ浏览器强制竖屏 测试
      {
        name: 'x5-orientation',
        content: 'portrait'
      },
      //
      {
        he: '',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // 是否为开发环境
  dev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',

  env: {
    HOST: process.env.NODE_ENV !== 'production' ? '127.0.0.1' : '0.0.0.0'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070'
  },

  router: {
    linkActiveClass: 'is-active',
  // middleware: "bind-phone"
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/css/base.css',
    'assets/css/animate.css',
    'assets/icon-font/iconfont.css',
  // "vue-material/dist/vue-material.min.css",
  // {
  //     src: "vue-material/dist/vue-material.min.css",
  //     lang: "css"
  // }, {
  //     src: "~/assets/theme.scss",
  //     lang: "scss"
  // }
  ],

  render: {
    // 生产环境使用9级压缩
    gzip: {
      threshold: 9
    }
  },

  // 模块
  modules: [
    [
      '@nuxtjs/sitemap',
      {
        path: '/sitemap.xml',
        hostname: 'https://www.datafountain.cn/',
        cacheTime: 1000 * 60 * 15, // 缓存15分钟
        generate: false, // Enable me when using nuxt generate
        exclude: ['/console/**', '/admin/**']
      }
    ]
  ],

  // 插件，从上到下依次加载
  plugins: [
    '~plugins/babel-polyfill',
    '~plugins/main',
    '~/plugins/vue-i18n.js',
    {
      src: '~plugins/raven-js',
      ssr: false
    },
    // {
    //     src: "~plugins/segment.js",
    //     ssr: false,
    // },
    // {
    //     src: "~plugins/logrocket.js",
    //     ssr: false,
    // },
    {
      src: '~plugins/vue-cookie.js',
      ssr: false
    },
    '~plugins/vue-bus',
    '~plugins/vue-filter',
    '~plugins/vue-directive',
    '~plugins/vue-moment',
    '~plugins/vue-qrcode',
    '~plugins/vee-validate',
    {
      src: '~plugins/vue-clipboard2',
      ssr: false
    },
    {
      src: '~plugins/v-charts',
      ssr: false
    },
    {
      src: '~plugins/element-ui',
      ssr: true
    },
  //  "~plugins/vue-material",
  // "~plugins/SidebarPlugin",
  // "~plugins/NotificationPlugin",
  ],

  /*
   ** Build configuration
   */
  build: {
    // vendor: ["vue-material"],
    parallel: true,

    babel: {
      presets: ['vue-app']
    },

  // 线上cdn地址，只有在生产环境经过build的静态文件才会生效
  // staging预备环境不使用cdn
  // publicPath: process.env.NODE_ENV === "production" ? "https://d1d6zvljen89j2.cloudfront.net/_nuxt/" : "",
  }
}
