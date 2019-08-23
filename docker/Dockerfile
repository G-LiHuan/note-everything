FROM node:8.4
# 将当前image文件继承官方的node image
COPY . /app
# 将当前目录下除.dockerignore文件排除之外的所有文件都拷贝进image文件的/app目录
WORKDIR /app
# 指定接下来的工作路径为/app
RUN npm install --registry=https://registry.npm.taobao.org
# 在工作路径下执行npm install命令；
EXPOSE 3000
# 将容器的3000端口暴露出来，允许外部链接这个端口
#CMD node ***.js
# 在容器启动之后执行shell命令