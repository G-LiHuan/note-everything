参考自阮一峰的docker教程```http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html```

本人以使用Mac电脑为主，所以只记录mac电脑上docker的使用历程，以下操作均在mac系统上进行；

### 1：安装
个人开发只需要下载社区版即可，官网下载地址（https://docs.docker.com/docker-for-mac/install/）

按照安装步骤安装完成之后，可以使用
```shell docker version```
或者
```shell docker info```
验证docker是否安装成功。

### 2：理解image文件（镜像文件）

docker 把应用程序及其依赖打包在image文件里面，只有通过这个文件，docker才能生成容器。image文件可以看做是生成容器的模板。容器是image的实例。

可以通过以下命令操作image文件
``` docker image ls // 查看本机所有的image文件 docker image rm [imagename] // 删除image文件 ```;

### 3：容器实例
Docker有官方的镜像仓库Docker Hub,在生成容器之前，需要先将相应的镜像文件从仓库拉取到本地
``` docker image pull library/hello-world ```
由于官方提供的镜像文件都在library目录下，所以也可以省略library；


``` docker container run hello-world ```
通过该命令生成容器，如果运行该命令之前没有拉取镜像文件，则会先把镜像文件拉去到本地；

提供服务的容器会持续运行，非服务类型的容器在运行完命令之后会立即停止；

### 4: .dockerignore文件，把不需要打包进入镜像文件的目录或者文件排除

### 5：Dockerfile, Dockfile是用来生成image文件的文件，包含一系列命令和操作，Dockerfile文件没有后缀，示例可以参考本文件夹下的Dockerfile文件

### 6：通过Dockfile生成image
通过```docker image build```命令创建image文件
```
docker image build -t docker-demo .
-- 或者
docker image build -t docker-demo:0.0.1 .
```
上面代码中，-t参数用来指定image文件的名字，后面还可以用冒号指定标签，如果不指定，默认的标签就是latest。最后那个点表示Dockerfile所在的文件路径

如果运行成功，就可以通过```docker image ls```查看

### 7：生成容器
依旧使用```docker container run```命令从image文件生成容器。
```
docker container run -p 8000:3000 -it docker-demo /bin/bash
-- 或者
docker container run -p 8000:3000 -it docker-demo:0.0.1 /bin/bash
```
上面命令含义如下：
-p参数：容器的3000端口映射到本机的8000端口；
-it参数：容器的Shell映射到本机的Shell，然后你再本机窗口输入命令，就会传入容器；
docker-demo：image文件的名字和标签
/bin/bash：容器启动以后，内部第一个执行的命令。这里是启动bash命令，保证用户可以使用Shell;

上面命令执行完毕之后，控制台会返回一个命令行提示符，这表示你已经在容器里面了。现在就可以通过当前的控制台操作容器里面的内容了；

可以使用```ctrl+d```退出容器。也可以使用```docker container kill [containerID]```终止容器运行；
也可以使用```docker container run --rm```在容器终止运行之后自动删除容器文件；
```
docker container run --rm -p 8000:3000 -it docker-demo /bin/bash
```
### 8：CMD命令
可以在Dockerfile中加入CMD命令，以便于在容器启动之后自动执行shell命令；如Dockerfile示例中启动node执行js文件；

CMD和RUN的区别
RUN命令在image文件的构建阶段执行，执行结果都会打包进入image文件；
CMD命令在容器启动后执行；
一个Dockerfile可以包含多个RUN命令，但只能包含一个CMD命令；
一旦在Dockerfile中指定了CMD命令之后，就不能在```docker container run```命令中接shell（/bin/bash）命令了，否则会覆盖CMD命令;

### 9: 发布image文件
首先，到https://hub.docker.com/注册一个账户；然后用下面的命令登录：
``` docker login ```;
接着，为本地的image标注用户名和版本。
```
docker image tag [imageName] [username]/[repository]:[tag]
(示例)
docker image tag docker-demo:0.0.1 itach/docker-demo:0.0.1
```
也可以不标注用户名，重新构建一下image文件
```
docker image build -t [username]/[repository]:[tag]
```
最后，发布image文件
```
docker image push [username]/[repository]:[tag]
```

### 10: 其他有用的命令
(1) docker container start;
用来启动已经生成，已经停止运行的容器文件
```
docker container start [containerID]
```

(2) docker container stop
用来终止容器运行。前面的```docker container kill```命令终止容器运行，相当于向容器里面的进程发出```SIGKILL```信号。而```docker container stop```命令也是用来终止容器运行，相当于向容器里的主进程发出```SIGTERM```信号，然后过一段时间再发出```SIGKILL```信号。
```
docker container stop [containerID]
```
这两个信号的差别是，应用程序收到```SIGTERM```信号以后，可以自行进行收尾工作，打也可以不理会这个信号。如果收到```SIGKILL```信号，就会强行立即终止，那些正在进行中的操作会全部丢失；

(3) docker container logs
```docker container logs```命令用来查看docker容器输出，即容器里面Shell的标准输出。如果```docker run```命令运行容器的时候，没有使用```-it```参数，就要使用这个命令查看输出；
```
docker container logs [containerID]
```

(4) docker container exec
```docker container exec```命令用于进入一个正在运行的docker容器。如果```docker run```命令运行容器的时候，没有使用```-it```参数，就要使用这个命令进入容器，一但进入容器，就可以在容器的Shell执行命令了。
```
docker container exec -it [containerID] /bin/bash
```

(5) docker container cp
```docker container cp```命令用于从正在运行的docker容器里面，将文件拷贝到本机。
```
docker container cp [containerID]:[/path/to/file] .
```
