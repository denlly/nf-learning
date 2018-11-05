export default ({ app: { router }, store }) => {
    /*
    ** 每次路由变更时进行pv统计
    */
    router.afterEach((to, from) => {
        /*
        ** 告诉 segment 在客户端切换了页面。客户端切换需要手动统计
        */

        analytics.page({
            path: to.fullPath,
            referrer: document.referrer,
            search: "",
            title: document.title,
            url: document.location.href
        })
    })
};
