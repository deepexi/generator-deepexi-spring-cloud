package ${basePackage}.domain.vo;

<%
if(conditions['mybatis-plus']){
    print(`import com.baomidou.mybatisplus.extension.plugins.pagination.Page;`)
}
%>
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Pagination<T> {
    @ApiModelProperty(value = "总行数", required = true)
    private Long total;
    @ApiModelProperty(value = "行数据", required = true)
    private List<T> rows = new ArrayList<>();

    public Pagination() {
    }

    public Pagination(Long total, List<T> rows) {
        this.total = total;
        this.rows = rows;
    }
<%
if(conditions['mybatis-plus']){
    print(`
    public static <T> Pagination<T> from(Page<T> page) {
        return new Pagination<>(page.getTotal(), page.getRecords());
    }
    `)
}
%>
}

