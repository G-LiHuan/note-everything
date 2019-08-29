## eslint 简介

1: 安装eslint
在项目根目录运行```yarn add eslint -D```安装。

2: 初始化配置文件
在根目录运行```./node_modules/.bin/eslint --init```初始化配置文件。然后按照引导流程一步步往下走就可以了。

3: 配置eslint
可以参考官方文档https://cn.eslint.org/docs/rules/查看rules配置。

4: 集成vscode
  a: vscode版本最好在Version: 1.37.1以上
  b: 需要再vscode中安装eslint插件
  c: 如果需要进行eslint验证的目录，即.eslintrc.js文件所在的目录不是根目录，则需要在vscode的配置文件中添加
  ~~~json
  "eslint.workingDirectories": [
    "path/childPath"
  ]
  ~~~
其中路径相对于根路径。

5: 集成ESLint和Typescript
  a: 下载相应插件
  ~~~shell
  yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
  ~~~
  b: 修改.eslintrc.js相应配置
  ~~~javascript
  "extends": [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  ~~~
  一是将编译器转换成typescript的编译器以支持ts。而是引入ts验证规则。
  c: 按照以上配置完成之后就可以发现在ts文件中已经启动eslint验证了。不过如果以如下方式引入ts模块还是会报错
  ~~~typescript
  import './index'
  ~~~
  因为eslint不知道引入的模块是什么类型的，所以需要告诉eslint应该支持哪些扩展名，此处是.ts扩展名。
  解决办法是：
  ~~~shell
  yarn add eslint-import-resolver-webpack -D
  ~~~
  先安装该插件，然后修改.eslintrc.js配置文件
  ~~~javascript
  "settings": {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js'
      }
    }
  },
  ~~~
  原理暂时不明！！！后续深入研究
  或者使用一下配置
  ~~~javascript
  "settings": {
    'import/resolver': {
      alias: {
        map: [
          'jquery', './node_modules/jQuery/index.ts'
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    }
  },
  ~~~
  到此就可以开心的在typescript代码中启用eslint验证啦！

## webpack 简介
1：如果在打包过程中报了例如```Can`t resolve 'fs' in...```这样的nodejs内部包找不到的问题，需要在webpack配置文件添加``` target: 'node'```.来告诉webpack打包的目标环境是node运行环境，否则webpack不知道目标环境，而浏览器环境是没有node内置包的，所以会报错。

2：如果在打包过程中遇到例如```Can`t resolve 'hiredis'...```类似第三方依赖的包找不到的问题，需要在webpack配置文件中添加```externals: [nodeExternals()]```解决该问题，需要先下载```webpack-node-externals```.

