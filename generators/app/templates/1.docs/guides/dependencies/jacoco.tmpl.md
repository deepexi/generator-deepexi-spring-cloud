# Jacoco

Jacoco可以为你统计代码覆盖率，默认作用在maven生命周期的`verify`阶段。

## 如何使用

执行maven的`verify`生命周期

```shell
$ mvn clean verify
```

如果你使用IDE，也可以直接在IDE上执行`root -> Lifecycle -> verify`。

然后可查看生成的测试报告

```shell
$ open cov-report/target/jacoco-ut/index.html
```

## 配置Jacoco

可以通过 `pom.xml` 的 `cov` profile对jacoco进行详细的配置，详细请参考[官方文档](https://www.jacoco.org/jacoco/trunk/doc/maven.html)。

### 常用配置

- `configuration -> rules -> rule -> limits -> limit`
    - COVEREDRATIO: 最低覆盖率百分比限制
    - MISSEDCOUNT: 最低无测试的类数量限制
- `configuration -> excludes -> exclude`: 需要排除统计的类

## 其它

### 关于cov-report模块

`cov-report`是为了聚合多模块工程环境下的多份报告而存在的模块，如果工程中添加了新的模块，需要在cov-report模块的pom.xml中加入相关的依赖，否则新模块的报告无法被聚合显示。

