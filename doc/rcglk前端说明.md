### rcglk前端说明

#### 1. 框架及依赖

- js框架：Angular v6.1.0
- ui框架：[NG-ZORRO v1.8.0](https://ng.ant.design/version/1.8.x/docs/introduce/zh)
- 依赖：xlsx v0.14.1
- cli：alngular/cli v6.1.1

#### 2. 功能模块

​	功能模块划分思路按照：角色 => 类功能 => 子功能

​	角色层：学生、辅导员

​	类功能层：用户类、获奖类、组织活动类、论文类、简历类

​	子功能层：用户及其信息添加/查看/修改/删除、获奖信息(批量)添加/查看/审核/修改/删除、组织活动信息(批量)添加/查看/修改/删除、论文信息(批量)添加/查看/修改/删除、简历填写/生成/修改/删除。

#### 3. 目录结构

``` javascript
// 只列出了部分主要的目录结构

├── README.md    
├── angular.json
├── e2e
│   ├── protractor.conf.js
│   ├── src
│   │   ├── app.e2e-spec.ts
│   │   └── app.po.ts
│   └── tsconfig.e2e.json
├── package-lock.json
├── package.json
├── src   // 程序主目录
│   ├── app
│   │   ├── admin    // 教师端
│   │   │   ├── adessay    // 论文管理
│   │   │   │   └── essaymanager
│   │   │   ├── adorg    // 组织活动信息管理
│   │   │   │   ├── orgcheck
│   │   │   │   └── orgmanager
│   │   │   ├── adprize    // 奖项管理
│   │   │   │   ├── prizecheck
│   │   │   │   └── prizemanager
│   │   │   └── usermanager    // 用户管理
│   │   ├── app-routing.module.ts    // 路由配置
│   │   ├── app.module.ts
│   │   ├── config.ts    // 基本配置(baseurl)
│   │   ├── data.model.ts    // 数据类模型、字段列表、转换方法
│   │   ├── guard    // 路由守卫
│   │   │   ├── manager.guard.ts
│   │   │   └── student.guard.ts
│   │   ├── login    // 登录跳转
│   │   │   └── do-login
│   │   ├── service    // 服务
│   │   │   └── user.service.ts    // 用户状态存储
│   │   └── student    // 学生端
│   │       ├── stuessay    // 论文模块
│   │       │   ├── stuaddessay
│   │       │   └── stuviewessay
│   │       ├── stuinfo    // 用户信息模块
│   │       ├── stuorg    // 组织活动信息模块
│   │       │   ├── stuaddorg
│   │       │   ├── stuorgdetail
│   │       │   └── stuvieworg
│   │       └── stuprize    // 奖项信息模块
│   │           ├── stuaddprize
│   │           ├── stuprizedetail
│   │           ├── stuviewprize
│   │           └── stuviewstatus
│   ├── assets    // 静态资源
│   │   └── images
│   │       ├── logo.png
│   │       └── user.png
│   ├── browserslist
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico    // 网站图标
│   ├── index.html
│   ├── karma.conf.js
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   └── tslint.json
├── tsconfig.json
└── tslint.json
```

#### 4. 项目待解决问题 



