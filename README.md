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

## vue中实现点击空白处隐藏功能

参考标签修改功能

## vue定义全局过滤器
1. 定义过滤器js文件，例如：src/common/filters/filter.js

filter.js文件内容如下：

```javascript
//所属部门
exports.departmentFilter = (value) => {
    switch(value) {
        case '1':
            return '人力资源部';
            break;
        case '2':
            return '技术部';
            break;
        case '3':
            return '客服部';
            break;
        case '4':
            return '市场部';
            break;
        case '5':
            return '产品部';
            break;
    };
};
```

2. main.js中添加以下代码

```javascript
//全局过滤器
import filters from './common/filters/filter.js'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
```

3. vue文件中调用

```javascript
<el-form-item label="所属部门：" label-width="120px">
  <span>{{ adminFormView.department | departmentFilter }}</span>
</el-form-item>
```

## vue定义全局公共函数

1. 定义全局公共函数js文件，例如：src/common/js/util.js

util.js文件内容如下：

```javascript
export default {
    getQueryStringByName: function (val) {
        
    },
    formatterDepartment: function(val) {
        switch(val) {
            case '1':
                return '人力资源部';
                break;
            case '2':
                return '技术部';
                break;
            case '3':
                return '客服部';
                break;
            case '4':
                return '市场部';
                break;
            case '5':
                return '产品部';
                break;
        };
    },
};
```

2. main.js中添加以下代码

```javascript
//全局方法
import util from './common/js/util.js'
Vue.prototype.util = util;
```

3. vue文件中调用

```javascript
departmentFormatter(row, column, cellValue) {
  return this.util.formatterDepartment(cellValue);
},
```
