package ${basePackage}.config.web;

import ${basePackage}.exception.BizErrorResponseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class ApplicationErrorAttributes extends DefaultErrorAttributes {

    @Autowired
    public ApplicationErrorAttributes(ServerProperties serverProperties) {
        super(serverProperties.getError().isIncludeException());
    }

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, boolean includeStackTrace) {
        Map<String, Object> attributes = super.getErrorAttributes(webRequest, includeStackTrace);

        if (webRequest.getHeader("Accept").matches(".*text/html.*")) {
            return attributes;
        }

        Map<String, Object> resultAttributes = new LinkedHashMap<>();
        resultAttributes.put("success", false);
        resultAttributes.put("message", attributes.get("message"));

        int status = Integer.parseInt(attributes.get("status").toString());
        if (status >= 400 && status < 500) {
            Throwable error = getError(webRequest);
            if (error != null) {
                BizErrorResponseStatus annotation = AnnotationUtils.findAnnotation(error.getClass(), BizErrorResponseStatus.class);
                if (annotation != null) {
                    resultAttributes.put("code", annotation.value());
                } else {
                    resultAttributes.put("code", "-1");
                }
            } else {
                resultAttributes.put("code", "-1");
            }
        } else {
            resultAttributes.put("code", "-2");
        }

        if (includeStackTrace) {
            resultAttributes.put("stack", attributes.get("trace"));
        }

        return resultAttributes;
    }
}
