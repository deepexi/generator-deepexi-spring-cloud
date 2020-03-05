package ${basePackage}.domain.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class DocumentDemoDTO {

    @NotNull
    private String username;
}
