# ShardingSphere

## 快速开始

### 添加 starter 依赖

```xml
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid-spring-boot-starter</artifactId>
        <version>1.1.17</version>
    </dependency>
    <dependency>
        <groupId>org.apache.shardingsphere</groupId>
        <artifactId>sharding-jdbc-spring-boot-starter</artifactId>
        <version>4.0.0-RC1</version>
    </dependency>
```
上面添加了starter依赖，同时sharding-jdbc支持任何的关系型数据库连接池，上面选用了druid

### application-local.properties 中添加相关配置

```yaml
spring:
  shardingsphere:
    # 数据源配置
    datasource:
      names: 'ds0,ds1'
      ds0:
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: com.mysql.jdbc.Driver
        url: 'jdbc:mysql://localhost:3306/ds_0?characterEncoding=utf-8'
        username: root
        password: root
      ds1:
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: com.mysql.jdbc.Driver
        url: 'jdbc:mysql://localhost:3306/ds_1?characterEncoding=utf-8'
        username: root
        password: root
    sharding:
      # 数据库分片策略
      default-database-strategy:
        inline:
          sharding-column: id
          algorithm-expression: 'ds$->{id % 2}'
      tables:
        # user_demo 表分片策略
        user_demo:
          actual-data-nodes: 'ds$->{0..1}.user_demo_$->{0..2}'
          table-strategy:
            inline:
              sharding-column: id
              algorithm-expression: 'user_demo_$->{id % 3}'
          key-generator:
            column: id
            type: SNOWFLAKE
```
配置好对应的数据源和分库分表策略后，启动项目即可。

## 如何使用
数据分片的分库分表功能可参考脚手架提供的 demo（ps: 使用脚手架中的 demo 时注意 数据库选择 `mysql`，连接池选择 `druid`, `orm` 框架选择 `mybatis` 或 `mybatis-plus`），更多玩法请参考[ShardingSphere官网](https://shardingsphere.apache.org/document/current/cn/overview/)
