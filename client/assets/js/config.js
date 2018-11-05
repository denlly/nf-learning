// 接口数据
const apis = {
    // 推广页接口
    invitation_statistics: ["/invitation/statistics", "get"],

    // 我的订单
    payment_list: ["/payment/list", "get"],
    // 鉴权类接口
    login: ["/auth/login", "post"],
    reset_password: ["/auth/reset_password", "put"],
    forget_password: ["/auth/forget_password", "post"],
    resendemail: ["/auth/resend_activation_email", "post"],
    geetest_register: ["/auth/geetest_register", "get"],
    getIP: ["/common/ip_region", "get"],
    invitation_clicks: ["/invitation/clicks", "get"],
    auth_activation:["/auth/activation","put"],


    // 用户类接口
    getUser: ["/user", "get"],

    // 产品类接口
    products_detail: ["/products/detail", "get"],
    products_compare:["/products/compare","get"],
    // typeWithProducts: ["/products/type-products", "get"],
    typeWithProducts: ["/products/list", "get"],
    product_card:["/contract/wish","post"],

    // typeWithProducts:["/products/typeWithProducts","get"],
    products_list: ["/products/list", "get"],

    // 销售折扣
    invitation_discount: ["/invitation/discount", "get"],
    // 汇率类接口


    // 合约类接口
    // admin
    admin_payment: ["/dashboard/base/payment", "get"],


    // 钱包类接口
    wallet: ["/wallet/wallet", "get"],
    wallet_list: ["/wallet/wallets", "get"],
    wallet_histories: ["/wallet/histories", "get"],
    wallet_balance: ["/wallet/balance", "get"],
    wallet_withdraw: ["/wallet/withdraw", "post"],
    wallet_operation: ["/wallet//wallet/operation", "post"],

    // 推广等级接口
    invitation_rank: ["/invitation/statistics/rank", "get"],

    // 收益类接口
    userdaysproductprofit: ["/profit/user_days_product_profit", "get"],
    userproductsprofit: ["/profit/user_products_profit", "get"],
    profit_brokerages: ["/profit/brokerages", "get"],

    // 支付方式类接口
    payment_ways: ["/payment/ways", "get"],
    payment_info: ["/payment/info/", "get"],
    payment_status: ["/payment/status/", "get"],
    payment_paycoin: ["/api/payment/paycoin", "post"],
    paypal_execute: ["/payment/paypal_execute", "put"],

    // Blog类接口
    blogitem: ["/content", "get"],
    bloglist: ["/contents/list", "post"],

    // Notice类接口
    notice_alllist: ["/inform/readlist", "get"],
    notice_unread: ["/inform/unread", "put"],
    notice_lastest: ["/inform/lastest", "put"],

    // 设置接口
    updatesetting: ["/user/setting", "post"],
    updatepassword: ["/user/password/reset", "post"],
    updateaddress: ["/user/wallet/edit", "post"],
    geturl:["/google2step/uri","get"],
    validatacode:["/google2step/validate","post"],
    opengg2setp:["/google2step/active","post"],
    closegg2setp:["/google2step/cancel","post"],

    // 用户反馈接口
    feedback:["/feedback/create","post"],

    // 管理员类接口
    milestone: ["/public/milestone", "get"],

    // 其余接口
    miningnumber:["/common/mining_user_count","get"]
}

// 产品滑动条数据
const productData = {
    BTC : {
        icon:'iconBTC', // 图标class
        breakpoint:[10,50,100,500], // 断点数字
        stepArr:[1,5,10,50], //增量
    },
    ETH : {
        icon:'iconETH', // 图标class
        breakpoint:[50,200,1000,2000], // 断点数字
        stepArr:[5,10,50,100], //增量
    },
    LTC : {
        icon:'iconLTC', // 图标class
        breakpoint:[500,1000,5000,10000,20000], // 断点数字
        stepArr:[50,100,500,1000,2000], //增量
    },
    DASH : {
        icon:'iconDASH', // 图标class
        breakpoint:[50,200,1000,2000], // 断点数字
        stepArr:[5,10,50,100], //增量
    },
    XMR : {
        icon:'iconXMR', // 图标class
        breakpoint:[500,1000,5000,10000,20000], // 断点数字
        stepArr:[50,100,500,1000,2000], //增量
    },
    ZEC : {
        icon:'iconZEC',
        breakpoint:[500,1000,5000,10000],
        stepArr:[50,100,500,1000]
    }
}

// 表格一页的条数
const tableParams = {
    limit_pc: 10,
    limit_m: 3,
    recentWithdraw: 5
}

const ERR_OK = 0

export {
    apis,
    productData,
    tableParams,
    ERR_OK,
}
