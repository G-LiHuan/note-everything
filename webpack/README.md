## eslint 简介

1: 安装eslint
在项目根目录运行```yarn add eslint -D```安装。

2: 初始化配置文件
在根目录运行```./node_modules/.bin/eslint --init```初始化配置文件。

## webpack 简介
1：如果在打包过程中报了例如```Can`t resolve 'fs' in...```这样的nodejs内部包找不到的问题，需要在webpack配置文件添加``` target: 'node'```.来告诉webpack打包的目标环境是node运行环境，否则webpack不知道目标环境，而浏览器环境是没有node内置包的，所以会报错。

2：如果在打包过程中遇到例如```Can`t resolve 'hiredis'...```类似第三方依赖的包找不到的问题，需要在webpack配置文件中添加```externals: [nodeExternals()]```解决该问题，需要先下载```webpack-node-externals```.

