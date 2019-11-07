# medical-system

（简易）医疗自助报销系统

## 资料

- [vue](https://cn.vuejs.org/v2/guide)

- [vuex](https://vuex.vuejs.org/zh/)

- [vue-router](https://router.vuejs.org/zh/)

- [element-ui 组件库](https://element.eleme.cn/#/zh-CN/)

## 进行开发

> 注意：示例命令中的 `[文字说明]` ，为需要根据实际情况填写的地方。  
> 如，git commit -m "[文字说明]"，实际应用应为 git commit -m "增加登录验证的功能"

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
cd [project-path] // 此处 project-path 指项目路径
yarn install // 此处需要时间较长，耐心等待
```

### 4. 运行项目

使用如下命令在本地预览项目。

```
yarn start
```

然后访问 [http://localhost:8080](http://localhost:8080) 就可以对网站进行预览。

### 5. 进行开发

在开发前，记得运行一下 `git pull` 来更新别的提交的代码。

如果 `git pull` 提示错误，很有可能是代码冲突。

使用如下方法解决冲突：

- `git fetch`
- `git merge`
- 打开编译器解决冲突
- `git add .`
- `git commit -m "[文字说明]"`
- `git push`

> 这里只说明最有可能的代码冲突错误。  
> 如有其它错误，再具体查看错误说明。

### 5. 提交代码

项目支持 `热编译` 即更改代码后不能重新启动项目，改动的代码就会被及时应用。

使用如下命令提交代码：

```bash
git add .
git commit -m "[对此次代码提交作说明，例如修改了什么，新增了什么]"
git push
```

如果上述命令出错，很有可能是代码出现了冲突，也就是你和他人一起修改同一部分的代码。

此时，可参考如下步骤：

1. `git fetch`
2. `git merge`
3. 发现提示冲突，打开IDE（推荐使用 VSCode 或者 webstom），解决冲突。
4. 重新执行如下命令。
   ``` bash
   git add .
   git commit -m "[说明文字]"
   git push
   ```
   
### 6. 使用 VS code 解决冲突

出现冲突后  

打开 VS code

点击左侧栏 `源代码管理图标`，如下图:
![源代码管理图标](http://39.108.92.147/imgs/2019/11/149ffbba4fd4a01d.png)

`"更改"选项卡` 下的文件就是有冲突的文件，打开文件解决冲突。

!["更改"选项卡](http://39.108.92.147/imgs/2019/11/7ffcfb50b34db592.png)

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