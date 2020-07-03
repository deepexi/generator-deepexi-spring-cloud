package ${basePackage}.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/config")
@RefreshScope
@Payload
public class NacosConfigDemoController {

<%
    let tmpl = `    @Value("\$\{useLocalCache:false\}")`;
    print(tmpl)
%>
    private boolean useLocalCache;


    @GetMapping("/get")
    public boolean get() {
        return useLocalCache;
    }
}
