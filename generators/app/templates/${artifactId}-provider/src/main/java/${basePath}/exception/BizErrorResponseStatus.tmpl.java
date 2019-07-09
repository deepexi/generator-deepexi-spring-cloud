package ${basePackage}.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.lang.annotation.*;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public @interface BizErrorResponseStatus {
    String value() default "-1";
}
