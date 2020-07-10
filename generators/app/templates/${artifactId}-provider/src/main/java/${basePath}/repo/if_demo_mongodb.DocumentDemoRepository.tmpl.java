package ${basePackage}.repo;

import ${basePackage}.domain.DocumentDemo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author deepexi
 */
@Repository
public interface DocumentDemoRepository extends MongoRepository<DocumentDemo, String> {
}
