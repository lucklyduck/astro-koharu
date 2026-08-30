---
title: 服务器到手配置
link: server-config
date: 2026-08-26 23:45:39
tags:
  - 服务器
categories:
  - 笔记
---
# 服务器到手配置

拿到一台全新的 VPS，首要任务不是立刻跑业务，而是做好基本功：测线路、改 SSH、配防火墙、装常用组件。这套流程我已经踩过无数次坑，特意整理出一份开箱即用的清单，适合 Debian/Ubuntu 系列小鸡，部分命令也可平移到 CentOS。

如果拿到的机器系统不是 debian 或者想要的系统，建议先去控制台重装系统再往下走喵。

## 一、基础更新并安装必要软件

进行后续操作前，先要保证系统够新，必要软件安装好。可以避免之后做啥都要装依赖。

没有权限的话，记得使用 sudo 喵

```bash
apt update && apt upgrade -y
apt install -y curl wget nano git htop tmux sudo unzip
```

## 二、 线路质量测试
在投入生产前，我会先用脚本对大带宽、延迟和丢包做一个摸底。尤其是跨境线路，高峰期表现能直接决定要不要退款。

### 2.1 一键测试脚本

脚本需要 root 权限，建议使用 root 账户运行喵

```bash
bash <(curl -sL https://run.NodeQuality.com)
```

这个脚本会自动测速、测路由，并生成一个包含图表的在线结果页。测试需要一段时间，这段时间里可以继续往下做，或者先刷会手机喵~

![vmiss机器性能测试](/post/server-config/性能测试图片.png )

## 三、配置新用户和 ssh 

有些云服商初始只提供了 root 用户和密码登录。很容易被爆破的喵！

### 3.1、添加用户

首先要添加一个用户（这里使用 vpsadmin 做演示，自己机机想用什么都可以喵）

```bash
adduser vpsadmin
```

然后添加到 sudo 组(记得将 vpsadmin 替换成你自己的用户名喵~)

```bash
usermod -aG sudo vpsadmin
```

最后检查一下 sudo 权限

```bash
sudo -l -U vpsadmin
```

如果看到结尾有(ALL : ALL) ALL，那就成功啦喵~

### 3.2、安全加固 SSH 防爆破

ssh 作为所有服务器都有的基础设施，而且登录上后就有了服务器的完全权限，每天都有人盯着 ssh 攻击喵。因此为了安全，在决定不退款后第一件事就是换密钥并取消 root 登录。

#### 3.2.1、配置公钥
首先将你的本地公钥（如 id_ed25519.pub）内容追加到服务器的 ~/.ssh/authorized_keys 文件中

如果是 windows，可以直接

```bash
ssh-copy-id 用户名@服务器IP
```

或者自己手动配置，直接

```bash
sudo nano ~/.ssh/authorized_keys
```
再将自己的公钥单独粘贴到一行就行啦

#### 3.2.2、修改 SSH 配置

编辑 SSH 配置文件：

```bash
sudo nano /etc/ssh/sshd_config
```

找到几个对应的配置项，取消注释并配置

```bash
Port 11422                # 修改到不常用高位端口防止被爆破 (记得在防火墙放行此端口喵！)
PermitRootLogin no        # 关闭root用户登录，防止被爆破
PasswordAuthentication no # 关闭密码登录，也是防止爆破
```

重启服务应用配置

```bash
systemctl restart ssh
```

检查是否成功

```bash
service ssh status
```

设置开机启动

```bash
systemctl enable ssh
```

这时候，不要关掉现在的 ssh 窗口，新开一个终端尝试用新端口和新用户和密钥登录，确保能连上再关闭当前窗口喵！不然你的小机机就只能去控制台才能恢复了喵！


#### 如果配置没生效

如果测试发现配置没生效，有可能是因为 SSH 由 systemd socket 接管的。

检查

```bash
systemctl status ssh.socket
```

如果显示 Active: active (listening)说明 SSH 是被 Socket 托管的喵。

解决 Socket 托管导致端口无法修改

```bash
# 1. 停止 socket
sudo systemctl stop ssh.socket
# 2. 禁用 socket (防止重启复活)
sudo systemctl disable ssh.socket
# 3. 重启 ssh 服务
sudo systemctl restart ssh
```

如果发现不是这个原因，或者是修改后部分配置还是未生效，有可能是因为有部分云服厂商为添加了其他的配置文件/etc/ssh/sshd_config.d/*.conf

检查：

```bash
ls /etc/ssh/sshd_config.d/
```

若有返回，则大概率这个原因。

解决方案：

直接删除这个目录下的其他配置

```bash
cd /etc/ssh/sshd_config.d/
sudo rm 列出来的.conf文件
```

<div style="display:none">
或者取消默认使用这些配置：

```bash
sudo nano /etc/ssh/sshd_config
```

删除或者用 # 注释这一行：

```bash
Include /etc/ssh/sshd_config.d/*.conf
```
</div>

这个配置指的是
## 四、防火墙

配置防火墙可以避免很多私密的服务被外界访问。有效提升安全性！这里以 UFW 为例喵

UFW 是 iptables 的前端，语法简单，非常适合快速设置。

### 4.1、安装 UFW 并放行常用端口(推荐)

```bash
# 安装ufw
sudo apt update && sudo apt install ufw -y

# ssh端口,记得修改成你自己配置的喵,务必第一个配置!
sudo ufw allow 11422/tcp

# 放行web常用端口

sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable

# 查看防火墙规则
sudo ufw status numbered