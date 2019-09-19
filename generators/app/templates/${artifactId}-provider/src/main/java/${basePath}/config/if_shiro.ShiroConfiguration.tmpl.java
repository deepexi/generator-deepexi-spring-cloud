package ${basePackage}.config;

<%
switch (authentication) {
    case 'jwt':
        print(`
import com.github.taccisum.shiro.web.autoconfigure.stateless.support.extractor.AuthorizationTokenExtractor;
import com.github.taccisum.shiro.web.autoconfigure.stateless.support.extractor.TokenExtractor;
import com.github.taccisum.shiro.web.autoconfigure.stateless.support.jwt.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.realm.Realm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class ShiroConfiguration {
    @Bean
    public Realm realm(JWTManager jwtManager) {
        return new OnlyParseJWTRealm("${jwtIssue}", jwtManager);
    }

    @Bean
    public PayloadTemplate payloadTemplate() {
        PayloadTemplate payloadTemplate = new DefaultPayloadTemplate("${jwtIssue}");
        payloadTemplate.addField("userId", String.class);
        payloadTemplate.addField("accountId", String.class);
        payloadTemplate.addField("tenantId", String.class);
        return payloadTemplate;
    }

    @Bean
    public TokenExtractor tokenExtractor() {
        return new AuthorizationTokenExtractor();
    }
}
        `)
        break;

    default:
        break;
}
%>
