nvm 是一个管理nodejs和npm版本的工具。

在mac环境下安装nvm

1: 安装nvm
``` curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash ```

2: 将nvm添加到全局命令
切换到电脑的根目录
``` cd ~ ```;
然后使用``` ls -a ```查看该目录下的所有文件，如果当前目录中有.bash_profile文件，则用vim工具打开文件，如果没有则新建一个文件。然后将
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```
粘贴到.bash_profile文件中,然后保存退出。运行``` source .bash_profile ```重新加载文件。只有就可以在控制台中输入``` nvm --version ```验证nvm是否安装成功。

2: 安装nodejs环境

直接在控制台运行``` nvm install stable ```可以安装最新稳定版的nodejs。
也可以使用 ``` nvm install <version> ```安装任意指定版本的nodejs。

如果在安装nvm之前就已经安装了nodejs和npm，需要先将nodejs和npm移除。

依次执行以下命令
```
npm ls -g --depth=0 # 查看已经全局安装的模块

sudo rm -rf /usr/local/lib/node_modules # 删除全局node_modules

sudo rm /usr/local/bin/node # 删除node

cd /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}' | xargs rm # 删除全局node模块注册的软链
```

然后在控制台中输入``` node -v ```和``` npm -v ```验证nodejs和npm时候已经被移除。确认移除之后再使用nvm安装node

3: nvm 命令

```nvm install stable``` ## 安装最新稳定版node
```nvm install <version>``` ## 安装指定版本的node
```nvm uninstall <version>``` ## 删除已安装的指定版本
```nvm use <version>``` ## 将当前node版本切换为目标版本
```nvm ls``` ## 列出已安装的所有node版本
```nvm ls-remote``` ## 列出所有远程服务器的版本
```nvm current``` ## 显示当前使用的版本
```nvm reinstall-packages <versiob>``` ## 在当前node环境下，重新全局安装指定版本好的的npm包