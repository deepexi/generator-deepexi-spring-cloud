package ${basePackage}.util;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DemoTest {
    @Test
    public void add() {
        assertThat(1 + 2).isEqualTo(3);
    }
}