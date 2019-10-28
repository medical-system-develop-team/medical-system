# medical-system

（简易）医疗自助报销系统

## 资料

- [vue](https://cn.vuejs.org/v2/guide)

- [vuex](https://vuex.vuejs.org/zh/)

- [vue-router](https://router.vuejs.org/zh/)

- [element-ui 组件库](https://element.eleme.cn/#/zh-CN/)

## 进行开发

### 1. 将仓库 `clone` 到本地。命令如下：

``` bash
// 需要配饰 ssh-key，才能使用下面命令
git clone git@github.com:meiQinQ/medical-system.git

// 如果未配置 ssh-key，可以使用如下命令
git clone https://github.com/meiQinQ/medical-system.git
```
### 2. 本地搭建运行环境

- 首先在 [Node 官网](https://nodejs.org/en/) 下载 `Node`，安装。

使用如下命令检查是否安装成功。

```
npm --version
node --version
```

如果都能正确输出版本号，则说明安装成功。

> 如果提示命令找不到，尝试重新安装。

- 安装 `yarn`，运行如下命令。

``` bash
npm install -g yarn // 大概需要两三分钟，建议多等待一会
```

### 3. 安装项目依赖

``` bash
// 打开终端（命令行）
cd [project-paht] // 此处 project-path 指项目路径
yarn install // 此处需要时间较长，耐心等待
```

### 4. 运行项目

使用如下命令在本地预览项目。

```
yarn start
```

然后访问 [http://localhost:8080](http://localhost:8080) 就可以对网站进行预览。

## 打包

使用如下命令进行打包操作。

```
yarn build
```

## 目录说明


```bash
+----public // 存放公共资源，如 icon
|
+----src // 项目主目录
|    |
|    +----assets // 存放项目静态资源，比如图片等
|    |
|    +----components // 组件
|    |
|    +----router // 路由
|    |
|    +----store // 全局存储
|    |
|    +----views // 视图（页面）
|    |
|    +----App.vue // 项目入口
|    |
|    +----main.js // 项目入口 js 文件
|
+----bable.config.js // babel 配置文件
|
+----package.json
|
+----README.md // 说明文件（本文件）
|
+----yarn.lock // yarn 版本控制
|
```