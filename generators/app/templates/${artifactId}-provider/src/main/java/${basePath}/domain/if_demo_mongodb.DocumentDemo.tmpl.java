package ${basePackage}.domain;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Data
@Accessors(chain = true)
@Document(collection = "user")
public class DocumentDemo {
    @Id
    private String id;
    @Field("username")
    private String username;
}
