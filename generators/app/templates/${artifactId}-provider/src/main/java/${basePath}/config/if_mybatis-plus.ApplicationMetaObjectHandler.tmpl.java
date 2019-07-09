package ${basePackage}.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Component
@Slf4j
public class ApplicationMetaObjectHandler implements MetaObjectHandler {
    @Autowired
    private RuntimeData runtimeData;

    @Override
    public void insertFill(MetaObject metaObject) {
        this.setInsertFieldValByName("dr", 0, metaObject);
        this.setInsertFieldValByName("createdAt", new Date(), metaObject);
        this.setInsertFieldValByName("createdBy", runtimeData.getUserId(), metaObject);
        this.setInsertFieldValByName("tenantId", runtimeData.getTenantId(), metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.setUpdateFieldValByName("updatedAt", new Date(), metaObject);
        this.setUpdateFieldValByName("updatedBy", runtimeData.getUserId(), metaObject);
    }

    public interface RuntimeData {
        String getUserId();

        String getTenantId();
    }
}