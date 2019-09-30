package ${basePackage}.service;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "string_demo")
public class StringCacheDemoService {
    @Cacheable
    public String get(String id) {
        return null;
    }

    @CacheEvict
    public void delete(String id) {
    }

    @CachePut
    public String create(String id) {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    @CachePut(key = "#id")
    public String update(String id, String content) {
        return content;
    }
}
