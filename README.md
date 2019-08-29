# note-everything
一些工具的使用方法或者遇到的坑



1： Mac OS 环境变量加载顺序

~~~shell
/etc/profile
/etc/paths
~/.bash_profile
~/.bash_login
~/.profile
~/.bashrc
~~~

2： Mac OS 定时任务

~~~shell
sudo crontab -u username -e
~~~
编辑crontab任务
~~~shell
sudo crontab -u username -l
~~~
查看当前运行的定时任务

