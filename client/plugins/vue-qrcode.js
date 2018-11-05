import Vue from "vue"
import QRCode from "qrcode"

var qrcodeOptions = {
    version: 5,
    errorCorrectionLevel: "L" ,
    margin: 2,
    color: {
        light: "#ffffff",
        dark: "#000000",
    },
    toSJISFunc: QRCode.toSJIS
}
Vue.directive('qrcode', function (ele,data) {
    Vue.nextTick(() => {
        qrcodeOptions.text = typeof data === 'object' ?
            data.href || data.value || data.text :
            data
        qrcodeOptions.width = data.width || 100,
        qrcodeOptions.height = data.height || 100,
        QRCode.toCanvas(ele, data.value, qrcodeOptions, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })


    })
})
