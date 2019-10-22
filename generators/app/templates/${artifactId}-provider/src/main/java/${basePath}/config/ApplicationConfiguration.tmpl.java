package ${basePackage}.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

@Configuration
public class ApplicationConfiguration {
    <%
        if(conditions['mybatis-plus']){
            print(`
    @Bean
    public ApplicationMetaObjectHandler.RuntimeData runtimeData() {
        return new ApplicationMetaObjectHandler.RuntimeData() {
            @Override
            public String getUserId() {
                return "1";
            }

            @Override
            public String getTenantId() {
                return "1";
            }
        };
    }
            `)
        }
    %>
}
