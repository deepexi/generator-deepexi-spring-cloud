# Sonar

> Sonar属于外部服务，在接入之前请先准备好可用的基础设施

## 如何接入 

`pom.xml` 中 `sonar` profile 配置：
 - `sonar.host.url` 为你的 sonar 服务地址
 - `sonar.username` && `sonar.password` sonar的用户名与密码 (可用 sonar.login 替代)
 - `sonar.login` 为 sonar 服务的访问 Token (sonar 页面 -> 用户头像下拉框 -> My Account -> Security -> Tokens)
 - [更多配置项](https://docs.sonarqube.org/latest/analysis/analysis-parameters/)

```xml
<profile>
    <id>sonar</id>
    <properties>
        <sonar.host.url>http://{sonar-url}</sonar.host.url>
        <sonar.login>{sonar-token}</sonar.login>
    </properties>
</profile>
```

然后执行

```shell
$ mvn clean verify sonar:sonar
```

如果你使用IDE，也可以直接在IDE先执行 `root -> Lifecycle -> verify`，再执行 `root -> Plugins -> sonar -> sonar:sonar`。

等待任务完成后，即可在sonar ui界面查看到你的代码分析结果。
