package ${basePackage}.util;

import com.github.taccisum.shiro.web.autoconfigure.stateless.support.jwt.JWTPrincipal;
import com.github.taccisum.shiro.web.autoconfigure.stateless.support.jwt.Payload;
import org.apache.shiro.SecurityUtils;

/**
 * @author deepexi
 */
public abstract class AbstractAuthUtils {
    public static String getToken() {
        return getPrincipal().getToken();
    }

    public static Payload getPayload() {
        return getPrincipal().getPayload();
    }

    private static JWTPrincipal getPrincipal() {
        return (JWTPrincipal) SecurityUtils.getSubject().getPrincipal();
    }
}
