module.exports = {
    root: true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        // "plugin:vue/recommended" // 暂时还模板部分解析不成功，先注释了只坚持js文件，之后再弄
    ],
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // "parser": "vue-eslint-parser",
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2017,
        "ecmaFeatures": {
            "globalReturn": false,
            "impliedStrict": false,
            "jsx": false,
            "experimentalObjectRestSpread": false
        }
    },
    // add your custom rules here
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": "off"
    },
    "globals": {
        "require": true,
        "LogRocket": true,
        "analytics": true,
        "Vue": true,
        "moment": true
    }
}
