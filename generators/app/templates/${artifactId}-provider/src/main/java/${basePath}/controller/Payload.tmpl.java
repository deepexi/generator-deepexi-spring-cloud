package ${basePackage}.controller;

import java.lang.annotation.*;

/**
 * @author deepexi
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Payload {
}
