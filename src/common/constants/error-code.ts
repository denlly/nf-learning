export enum ErrorCode {
    ENV_ERROR = 9999,

    // 示例：Order错误码从1000开始 ---------------------------------------------------
    ORDER_ERROR = 1000,
    ORDER_LIMIT_PRICE_ERROR = 1000,

    // 用户相关错误码，从2000开始  -----------------------------------------------------

    /**
     * 用户激活码错误
     */
    USER_ACTIVATION_CODE_ERROR = 2000,

    /**
     * 用户已激活，不能重复激活
     */
    USER_ACTIVATED_ERROR = 2001,

    /**
     * 用户激活码过期
     */
    USER_ACTIVATION_CODE_EXPRIED_ERROR = 2002,

    /**
     * 用户未激活，需要激活
     */
    USER_UNACTIVATED_ERROR = 2003,

    /**
     * 重发激活邮件超过当天允许次数
     */
    USER_RESEND_ACTIVATION_CODE_LIMIT_ERROR = 2004,

    /**
     * 发送找回密码邮件超过当天允许次数
     */
    USER_SEND_FORGET_PASSWORD_TOKEN_LIMIT_ERROR = 2005,

    /**
     * 用户忘记密码token错误
     */
    USER_FORGET_PASSWORD_TOKEN_ERROR = 2006,

    /**
     * 用户忘记密码token过期
     */
    USER_FORGET_PASSWORD_TOKEN_EXPRIED_ERROR = 2007,
    /**
     * 用户不存在
     */
    USER_NOT_EXIST = 2008,
    /**
     * 用户已经存才
     */
    USER_ALREADY_EXIST = 2009,
    /**
     * 密码错误
     */
    USER_PASSWORD_INCORRECT = 2010,

    /**
     * 注册速度太快了
     */
    USER_REGISTER_TOO_FAST = 2011,

    /**
     * 用户人机验证异常
     */
    USER_RECAPTCHA_VALIDATE_ERROR = 2012,
    USER_RECAPTCHA_TYPE_ERROR = 2013,

    /**
     * 用户邮箱激活时候，用户已经激活
     */
    USER_ACTIVATED_EMAIL_ERROR = 2014,

    /**
     * 用户邮箱激活时候，邮箱已经被使用
     */
    USER_ACTIVATED_EMAIL_OTHER_ONE_USED_ERROR = 2015,

    // 用户设置相关错误

    /**
     * 用户设置的字段非法
     */
    SETTING_FIELD_ILLEGAL = 2021,

    /**
     * 用户原始密码输入错误
     */
    ORIGINAL_PASSWORD_ERROR = 2022,

    // 产品相关错误码，从3000开始 ---------------------------------------------------

    /**
     *  产品库存不足
     */
    PRODUCT_INVENTORY_NOT_ENOUGH_ERROR = 3000,

    /**
     * 没有这个产品
     */
    PRODUCT_NOT_EXIST_ERROR = 3001,

    /**
     * 购买量必须大于最低购买量
     */
    AMOUNT_MUST_MORE_THAN_MIN_AMOUNT = 3002,

    // 支付相关的错误，从4000开始---------------------------------------------------
    /**
     * 支付信息不存在的错误
     */
    PAY_NOT_EXIST_ERROR = 4000,

    /**
     * 验证钱包是否和人匹配
     */
    PAY_WALLET_INCORRECT_WITH_USER = 4001,

    /**
     * 验证用户和Email是否匹配
     */
    PAY_EMAIL_INCORRECT_WITH_USER = 4002,

    /**
     * 支付信息无法保存
     */
    PAY_NOT_BE_SAVED = 4003,

    /**
     * 支付没有token
     */
    PAY_NO_TOKEN = 4004,

    /**
     * 支付单状态错误
     */
    PAY_STATUS_ERROR = 4005,

    PAY_CREATION_ERROR = 4006,

    // 订单相关的错误，从5000开始---------------------------------------------------

    CONTRACT_NOT_EXIST = 5000,
    CONTRACT_ALREADY_EXIST = 5001,

    // 钱包相关的错误，从6000开始---------------------------------------------------

    // 币种类型不被支持
    COIN_TYPE_NOT_SUPPORT = 6000,

    // 钱包操作类型不被支持
    WALLET_OPERATION_TYPE_NOT_SUPPORT = 6001,

    // 钱包不存在
    WALLET_NOT_EXIST = 6002,

    // 钱包已经存在
    WALLET_ALREADY_EXIST = 6003,

    // 钱包操作不存在
    WALLET_OPERATION_NOT_EXIST = 6004,

    // 钱包操作金额非法
    WALLET_OPERATION_AMOUNT_ERROR = 6005,

    // 钱包操作状态不非法
    WALLET_OPERATION_STATUS_ERROR = 6006,

    // 钱包操作失败
    WALLET_OPERATION_ERROR = 6007,

    // 钱包地址不存在
    WALLET_ADDRESS_NOT_EXIST = 6008,

    // 钱包地址验证不通过
    WALLET_ADDRESS_UNVERIFIED = 6009,

    // 钱包余额不足
    BALANCE_NOT_ENOUGH = 6010,

    // 钱包冻结余额不足
    FROZEN_BALANCE_NOT_ENOUGH = 6011,

    // 手续费值非法
    WALLET_FEE_ERROR = 6012,

    // 推广相关的错误，从7000开始---------------------------------------------------

    INVITATION_ALREADY_EXIST = 7000,
    INVITATION_NOT_EXIST = 7001,

    FreeHash_ALREADY_EXIST = 7002,
    FreeHash_NOT_EXIST = 7003,

    INVITATION_CODE_NOT_EXIST = 7004,

    // 收益数据相关错误

    // 获取BTC币种收益失败
    BTC_REVENUE_FETCH_ERROR = 8000,

    // 获取多币种收益失败
    BTC_REVENUES_FETCH_ERROR = 8001,

    PROFIT_NOT_EXIST = 8002,
    PROFIT_ALREADY_EXIST = 8003,
}
