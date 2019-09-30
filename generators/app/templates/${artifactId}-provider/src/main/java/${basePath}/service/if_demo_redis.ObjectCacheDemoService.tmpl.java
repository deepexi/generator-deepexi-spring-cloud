package ${basePackage}.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Random;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "object_demo")
public class ObjectCacheDemoService {
    @Cacheable
    public Model get(String id) {
        return null;
    }

    @CacheEvict
    public void delete(String id) {
    }

    @CachePut
    public Model create(String id) {
        Random r = new Random();
        return new Model(
                id,
                UUID.randomUUID().toString().replaceAll("-", ""),
                r.nextInt(1000),
                r.nextBoolean()
        );
    }

    @CachePut(key = "#id")
    public Model update(String id, Model content) {
        return content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Model implements Serializable {
        private String id;
        private String str;
        private Integer num;
        private Boolean bool;
    }
}
