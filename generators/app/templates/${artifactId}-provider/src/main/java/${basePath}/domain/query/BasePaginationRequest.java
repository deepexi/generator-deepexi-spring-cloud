package ${basePackage}.domain.query;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiParam;
import lombok.Data;

/**
 * @author deepexi
 */
@Data
public abstract class BasePaginationRequest {
    @ApiParam(value = "index", example = "1")
    private Integer index = 1;
    @ApiParam(value = "size", example = "20")
    private Integer size = 20;

    @JsonIgnore
    @ApiParam(hidden = true)
    public Integer getOffset() {
        return getSize() * (getIndex() - 1);
    }

    @JsonIgnore
    @ApiParam(hidden = true)
    public Integer getLimit() {
        return getSize();
    }
}
