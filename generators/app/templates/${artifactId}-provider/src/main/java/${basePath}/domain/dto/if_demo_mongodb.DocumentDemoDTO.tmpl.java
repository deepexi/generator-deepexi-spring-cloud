package ${basePackage}.domain.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

@Data
@Accessors(chain = true)
public class DocumentDemoDTO {
    @NotNull
    private String username;
}
