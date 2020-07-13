# Nacos

> Nacos 属于外部依赖，在接入之前请先准备好可用的 Nacos 基础设施

## 如何接入

配置 Nacos

 <%
if (nacosDiscovery) {
print(`
### 启用服务发现
**application.yml**
\`\`\`yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
\`\`\`
### 不同环境的差异

#### 本地环境

由于本地环境配置往往用于开发阶段，因此 Nacos 默认是禁用掉的，可以通过以下配置修改
**application-local.yml**
\`\`\`yaml
spring:
  cloud:
    nacos:
      discovery:
        enabled: true
\`\`\`
`)
}
if (nacosConfigservice) {
print(`
### 启用配置管理
**bootstrap.yml**
\`\`\`yaml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: properties
\`\`\`
`)
}
%>

## 如何使用
接入 Nacos 后，关于如何在代码使用 Nacos 相关功能请参考[官方文档](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)