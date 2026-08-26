---
title: 个人博客搭建记录
link: ge-ren-bo-ke-da-jian-ji-lu
date: 2026-08-26 03:37:09
tags:
  - 博客
  - 笔记
categories:
  - 笔记
draft: true
updated: 2026-08-26 18:09:49
---
# 个人博客搭建记录

最近买了云服，想起了之前购买的域名，于是开始想要自己搭建一个属于自己的博客。于是便有了本站：

对于也想要搭建自己博客的新手，推荐参考本文，详细记录了我作为新手搭建博客的过程（只会一点 C 语言，对前端一点都不会）。如果遇到问题，欢迎联系我喵

## 搭建博客你需要准备什么

一个域名。一个 GitHub 账户（应该都有吧）。

对，只需要一个域名，可以完全没有云服。当下有相当多的免费的服务提供商。只需要一个域名，你就可以开始下面的工作了。

如果没有域名：[低价域名购买](https://www.spaceship.com/)

## 一、寻找一个合适的博客模板

对于新手，直接找别人的成品模板是最方便的方案。你可以注意一下别人的博客，看到喜欢的，可以直接把链接喂给 GPT 问想要搭建类似风格博客，有什么开源框架用来搭建（

实际上，这个博客的框架就是在查阅资料时，看到了一个博客使用的这个框架，然后问 GPT 来教我怎么搭建的（AI 还是太好用了）

对于接下来的内容,都将以[astro-koharu](https://github.com/cosZone/astro-koharu)项目作为模板进行搭建。对于其他的模板，也可以作为一些参考。

## 二、本地部署开发

在正式搭建并推送到网站上前,应当先在本地搭建项目并测试,然后再进行部署.

### 2.1 本地初次部署测试

打开项目,点击右上角 star 和边上的"Use this template",并创建为新仓库.为你的博客仓库进行命名,创建.

创建完成后,在自己电脑上,寻找一个合适的用来保存文件的文件夹,在文件夹中打开终端,并将项目克隆下来.

随后进入项目目录,执行以下命令进行首次部署和测试:(需要预先安装 npm 和 pnpm)

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

其中,pnpm dev 和 pnpm preview 会生成一个链接,点击链接即可查看你的博客的预览效果喵!

> dev 和 preview 的区别:dev运行的是开发服务器,得到的网页中会包含草稿等.而 preview 运行的是生产服务器,网站中不包含草稿,和最终搭建部署的网页会相同.

### 2.2 基础配置

编辑 `config/site.yaml` 文件配置站点基本信息：

```yaml
# =============================================================================
# 站点基础信息
# =============================================================================
site:
  title: 余弦の博客 # 网站标题
  alternate: cosine # 英文短名（用作 logo 文本）
  subtitle: WA 的一声就哭了 # 副标题
  name: cos # 站点作者简称
  description: FE / ACG / 手工 / 深色模式强迫症 / INFP # 站点简介
  avatar: /img/avatar.webp # 头像路径
  showLogo: true # 是否显示 logo
  author: cos # 文章作者
  url: https://blog.cosine.ren/ # 站点域名
  startYear: 2020 # 站点创建年份
  keywords: # SEO 关键词
    - cos
    - cosine
    - 博客
    - 技术
    - 前端
```

其中,头像文件实际路径为 public/img/avatar.webp ,通常只需要替换文件即可.

编辑修改社交链接

```yaml
social:
  github:
    url: https://github.com/your-username # 替换为你的 GitHub 链接
    icon: ri:github-fill # Remix Icon 的 GitHub 图标
    color: '#191717' # (可选) 图标颜色
  email:
    url: mailto:your@email.com # 替换为你的邮箱，需加 mailto: 前缀
    icon: ri:mail-line
    color: '#55acd5'
  rss:
    url: /rss.xml # 站内 RSS 订阅地址
    icon: ri:rss-line
    color: '#ff6600'
  # -------------------------------------------------------------------------
  # 以下是更多可选的社交平台配置示例，取消注释并修改即可启用：
  # -------------------------------------------------------------------------
  # twitter:
  #   url: https://x.com/your-handle
  #   icon: ri:twitter-fill
  #   color: '#4b9ae4'
  # bilibili:
  #   url: https://space.bilibili.com/your-id
  #   icon: ri:bilibili-fill
  #   color: '#da708a'
  # zhihu:
  #   url: https://www.zhihu.com/people/your-id
  #   icon: ri:zhihu-fill
  #   color: '#1e88e5'
  # music:
  #   url: https://music.163.com/#/user/home?id=your-id
  #   icon: ri:netease-cloud-music-line
  #   color: '#e60026'
```

这些会显示在博客中首页左侧头像下面.

编辑修改友链:

```yaml
friends:
  intro:
    title: 友情链接 # 页面标题
    subtitle: 欢迎交换友链！ # 页面副标题
    applyTitle: 申请友链 # 申请区块标题
    applyDesc: 请在本页留言，格式如下 # 申请说明
    exampleYaml: | # 申请格式示例，会显示在页面上
      - site: 你的博客名称 # 站点名称
        url: https://your-blog.com/ # 站点网址
        owner: 你的昵称 # 昵称
        desc: 站点简介 # 站点简介
        image: https://your-blog.com/avatar.jpg # 头像链接
        color: "#ffc0cb" # 主题色（可选）
  data: # 友链列表
    - site: 余弦の博客
      url: https://blog.cosine.ren
      owner: cos
      desc: FE / ACG / 手工 / 深色模式强迫症 / INFP / 兴趣广泛养两只猫的老宅女 / remote
      image: https://blog.cosine.ren/img/avatar.webp
      color: '#ed788b'
    - site: 示例博客 A
      url: https://example-a.com
      owner: Alice
      desc: 一个热爱技术的开发者
      image: https://api.dicebear.com/7.x/avataaars/svg?seed=Alice
      color: '#BEDCFF'
    - site: 示例博客 B
      url: https://example-b.com
      owner: Bob
      desc: 分享生活与技术的小站
      image: https://api.dicebear.com/7.x/avataaars/svg?seed=Bob
      color: '#FBC1CC'
    - site: 示例博客 C
      url: https://example-c.com
      owner: Carol
      desc: 记录学习与成长的地方
      image: https://api.dicebear.com/7.x/avataaars/svg?seed=Carol
      color: '#ABDCFF'
```

如果没有友链,将 data 中的示例博客删除即可

修改关于页面:

编辑 src\pages\about.md 文件以修改关于界面信息:

```markdown
---
layout: ../layouts/PageLayout.astro
title: "About"
coverTitle: "关于我"
date: 2025-01-03 01:01:33
description: "关于我？"
---

## 你好，这里是余弦

[![github badge](https://img.shields.io/badge/dynamic/json?color=blue&label=Github&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dgithub%26queryKey%3Dyusixian)](https://github.com/yusixian)

cosine = 余弦 = cos

愿热情永存，愿热爱不灭，愿生活无憾

> 我们 都只是无名之辈 \
> 做你自己最喜欢的事 \
> 像花一样 肆意绽放 \
> 不去管 有没有人欣赏

### 找到我

个人 Telegram 前端频道：日常碎碎念，偶尔掉落优质前端博文推荐、学习资源等

https://t.me/cosine_front_end

Gitbook 前端学习记录

https://book.cosine.ren/

[![GitHub State](https://git-stats.cosine.ren/api?username=yusixian&theme=dark&show_icons=true&hide_border=true)](https://github.com/anuraghazra/github-readme-stats)

[![GitHub Streak](https://github-readme-streak-stats-rust-tau.vercel.app?user=yusixian&theme=dark&date_format=%5BY%20%5DM%20&hide_border=true)](https://git.io/streak-stats)
```

按照格式修改开头的时间等信息.对于下面的信息可以任意修改

完成以上配置后,推荐进行测试构建和预览,检查是否存在问题.

清理示例文章并创建新的文章:

将 `src/content/blog/` 中的示例文件删除,不要删除文件夹.

修改本地编辑器跳转配置(可选):

编辑 config/site.yaml

```yaml
dev:
  localProjectPath: "/Users/yourname/path/to/astro-koharu" # 本地项目绝对路径
  contentRelativePath: "src/content/blog" # 博客内容目录
  editors:
    - id: vscode
      name: VS Code
      icon: devicon-plain:vscode # 可从 https://icon-sets.iconify.design/ 搜寻图标
      urlTemplate: "vscode://file/{path}"
    - id: cursor
      name: Cursor
      icon: simple-icons:cursor
      urlTemplate: "cursor://file/{path}"
    - id: zed
      name: Zed
      icon: simple-icons:zedindustries
      urlTemplate: "zed://file/{path}"
```

将 localProjectPath 修改成本地项目目录即可.对于其他编辑器,如果没装,可以注释掉.

对于创建新文章,你可以在文件夹下按照如下格式自行撰写 md 文档

```markdown
---
title: 我的文章标题
date: 2026-08-25
description: 文章摘要
tags:
  - 标签
categories:
  - 笔记
---

文章正文。
```

在这里使用另外一种推荐方法用来创建文章:

在项目中,打开终端,输入

```text
pnpm koharu
```

启动交互式命令行

选择 新建-博客文章 输入内容即可

或者直接指定创建

```text
# 交互式选择创建类型（文章或友链）
pnpm koharu new

# 或直接指定类型
pnpm koharu new post     # 新建博客文章
pnpm koharu new friend   # 新建友情链接
```
