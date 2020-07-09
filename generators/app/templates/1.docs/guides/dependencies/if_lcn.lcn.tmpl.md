# TX-LCN
 
## 如何使用

> TX-LCN 主要有两个模块，Tx-Client(TC)、 Tx-Manager(TM)，在接入之前请先准备好可用的`Tx-Manager`基础设施
>
 在代码中通过 @LcnTransaction 等注解使用分布式事务，如:
 ```java
@Service
public class ServiceA {
    
    @Autowired
    private ValueDao valueDao; //本地db操作
    
    @Autowired
    private ServiceB serviceB;//远程B模块业务
    
    @LcnTransaction //分布式事务注解
    @Transactional //本地事务注解
    public String execute(String value) throws BusinessException {
        // step1. call remote service B
        String result = serviceB.rpc(value);  // (1)
        // step2. local store operate. DTX commit if save success, rollback if not.
        valueDao.save(value);  // (2)
        valueDao.saveBackup(value);  // (3)
        return result + " > " + "ok-A";
    }
}
```

## 其他
更多配置（如 Tx-Manager 的配置，TCC 事务模式，TXC 事务模式等）请参考 [TX-LCN](https://www.codingapi.com/docs/home/) 相关文档。