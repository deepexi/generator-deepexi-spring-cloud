package ${basePackage}.domain.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

/**
 * @author deepexi
 */
@Data
@Accessors(chain = true)
public class DocumentDemoDTO {
    @NotNull
    private String username;
}
