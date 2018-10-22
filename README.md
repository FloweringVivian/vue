# vue使用总结

> A Vue.js project

## Build Setup

``` bash
#install vue
npm install vue

#install vue-cli
npm install --global vue-cli

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

## vue在IE9上的兼容性问题解决

1. 首先npm install –save babel-polyfill

2. 然后在main.js中的最前面引入babel-polyfill

```javascript
import 'babel-polyifll'
```

3. 在index.html 加入以下代码（非必须）

```javascript
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

4. 在webpack.base.conf.js中,修改编译配置

```javascript
entriy:{ 
  app:['babel-polyfill':'./src/main.js'] 
}
```

如果上面写法打包报错，可以尝试下面这种写法

```javascript
entriy:{ 
  'babel-polyfill': 'babel-polyfill',
  app:'./src/main.js'
}
```

* 注意：这种方法只能让打包之后的项目支持IE9

## 将element-ui的默认语言设置为英文

1. main.js

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
```

2. webpack.dev.conf.js 和 webpack.prod.conf.js 在plugins增加

```javascript
plugins: [
  new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
]
```

## vue img 的 src 绑定问题

```javascript
<img :src="imgUrl">
```

当imgUrl设置为本地相对路径的一个图片之后，发现无法显示，正确的做法是把图片文件放到static文件夹下即可

## 改变vue打包的路径

修改config目录下的index.js

```javascript
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),  //修改此处
        assetsRoot: path.resolve(__dirname, '../dist'),  //修改此处
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },    
}
```

## vue + element-ui实现表单校验时，根据条件不同设置必填校验的方法实现

例如：登录页面密码输错3次以后显示图片验证码，并对图片验证码进行非空校验

```javascript
<template>
...
    <el-form-item prop="captcha" v-show="isShowCaptcha" 
        :rules="this.isShowCaptcha == true?loginRule.captcha:[{required: false, message: '请输入图片验证码', trigger: 'blur'}]">
    </el-form-item>
...
</template>

<script>
export default {
    return {
        loginRule: {
            captcha: [{required: true, message: '请输入图片验证码', trigger: 'blur'}]
        }
    }
}
</script>
```

