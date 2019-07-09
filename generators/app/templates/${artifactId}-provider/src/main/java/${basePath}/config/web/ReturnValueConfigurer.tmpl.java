package ${basePackage}.config.web;

import ${basePackage}.controller.Payload;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class ReturnValueConfigurer implements InitializingBean {
    @Autowired
    private RequestMappingHandlerAdapter adapter;

    @Override
    public void afterPropertiesSet() {
        List<HandlerMethodReturnValueHandler> handlers = new ArrayList<>(adapter.getReturnValueHandlers());
        for (HandlerMethodReturnValueHandler item : handlers) {
            int index = handlers.indexOf(item);
            if (RequestResponseBodyMethodProcessor.class.isAssignableFrom(item.getClass())) {
                handlers.add(index, new RequestResponseBodyMethodProcessorProxy((RequestResponseBodyMethodProcessor) item));
                handlers.remove(item);
                break;
            }
        }
        adapter.setReturnValueHandlers(handlers);
    }

    private static class RequestResponseBodyMethodProcessorProxy implements HandlerMethodReturnValueHandler {
        private RequestResponseBodyMethodProcessor delegate;

        public RequestResponseBodyMethodProcessorProxy(RequestResponseBodyMethodProcessor delegate) {
            this.delegate = delegate;
        }

        @Override
        public boolean supportsReturnType(MethodParameter methodParameter) {
            if (!delegate.supportsReturnType(methodParameter)) {
                return false;
            }

            if (AnnotationUtils.findAnnotation(methodParameter.getMethod(), Payload.class) != null) {
                return true;
            } else {
                Class<?> clazz = methodParameter.getContainingClass();
                return AnnotationUtils.findAnnotation(clazz, Payload.class) != null;
            }
        }

        @Override
        public void handleReturnValue(Object o, MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest) throws Exception {
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("code", "1");
            result.put("payload", o);

            delegate.handleReturnValue(result, methodParameter, modelAndViewContainer, nativeWebRequest);
        }
    }
}
