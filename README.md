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

## $nextTick

Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM，API 文档中官方示例如下：

```javascript
new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // modify data
      this.message = 'changed'
      // DOM is not updated yet
      this.$nextTick(function () {
        // DOM is now updated
        // `this` is bound to the current instance
        this.doSomethingElse()
      })
    }
  }
})
```

## element-ui自定义表单规则后，红色必填星号不显示

在自定义的一项那里加上required星号就显示出来了

```javascript
<el-form-item label="公司名称" prop="name" required>
  <el-input v-model="form.name"></el-input>
</el-form-item>
```

## element-ui表单校验某几项

有时候我们需要只校验表单的某一项，比如获取手机验证码，要校验手机号必填，此时可以用validateField

```javascript
//phone就是定义的prop字段名称
this.$refs.registerForm.validateField('phone', (errMsg) => {
    if (!errMsg) {
        console.log('手机号校验通过);
        //调接口
    } else {
        console.log('手机号校验不通过);
    };
})
```

如果校验2项或以上，比如获取手机验证码，要校验手机号和图片验证码，此时prop可以传数组

```javascript
this.$refs.registerForm.validateField(['phone', 'captcha'], (errMsg) => {
    if (!errMsg) {
        console.log('手机号、图片验证码校验通过);
        //调接口
    } else {
        console.log('手机号、图片验证码校验不通过);
    };
})
```

这样写之后发现一个问题，第一次点击“获取手机验证码”后正常，手机号和图片验证码出现必填提示

但是手机号填了之后，图片验证码没填的情况下，点击“获取手机验证码”就走到调接口这步了，说明校验通过了

所以，下面这个写法才是最终正确的答案。

```javascript
if (this.registerForm.phone == '' || this.registerForm.captcha == '') {
    this.$refs['registerForm'].validateField('phone');
    this.$refs['registerForm'].validateField('captcha');
} else {
    console.log('手机号、图片验证码校验通过);
    //调接口
})
```
