# Sonar

> Sonar属于外部服务，在接入之前请先准备好可用的基础设施

## 如何接入 

通过 `pom.xml` 的 `sonar` profile 配置 `sonar.host.url` 为你的sonar服务地址

```xml
<profile>
    <id>sonar</id>
    <properties>
        <sonar.host.url>http://{sonar-url}</sonar.host.url>
    </properties>
</profile>
```

然后执行

```shell
$ mvn clean verify sonar:sonar
```

如果你使用IDE，也可以直接在IDE先执行 `root -> Lifecycle -> verify`，再执行 `root -> Plugins -> sonar -> sonar:sonar`。

等待任务完成后，即可在sonar ui界面查看到你的代码分析结果。
