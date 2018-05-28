# vue使用总结

> A Vue.js project

## Build Setup

``` bash
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

