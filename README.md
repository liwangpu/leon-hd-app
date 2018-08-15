# 服务器相关配置
> App相关配置保存在src/environments 相关文件夹下面,不同服务器配置在environment.*.ts里.以environment.dev.ts测试配置为例,需要启的动命令为npm run dev,如果是environment.prod.ts,则启动命令为npm run prod,以此类推,具体编译等详细命令参考package.json=>scripts

**配置项说明**
配置项|说明
---|---
production: false|是否为生产环境
hmr: false|App热更新
serveBase: 'http://localhost:1882'|API服务器
secretKey:'damaozhu-app'|App密钥,用于加密cache,local store等信息,App采用对称加密方式对一些缓存信息进行加密
shareServerBase: 'http://192.168.1.3:82/share-resource'|分享链接服务器
dialogMin|App小型对话框默认大小
dialogMed|App中型对话框默认大小

