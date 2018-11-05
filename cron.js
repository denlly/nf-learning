var Raven = require("raven")
Raven.config("https://caf8114e9ce84035a9387bf34cf9cc1d@sentry.io/1181332").install()

// 为处理异常发送到sentry.io
process.on("unhandledRejection", (reason, p) => {
    console.log(reason)
    console.log(p)

    Raven.captureException(reason)
})

require("newrelic")
require("ts-node/register")
require("./src/cron")
