package ${basePackage}.util;

import org.springframework.core.convert.ConversionService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public abstract class ConverterUtils {
    private static ConversionService conversionService;

    public static void setConversionService(ConversionService conversionService) {
        ConverterUtils.conversionService = conversionService;
    }

    public static <FROM, TO> TO convert(FROM from, Class<TO> toClazz) {
        return conversionService.convert(from, toClazz);
    }

    public static <FROM, TO> List<TO> convertAll(List<FROM> fromList, Class<TO> toCls) {
        if (fromList == null || fromList.size() == 0) {
            return new ArrayList<>();
        }

        return fromList
                .stream()
                .map(from -> conversionService.convert(from, toCls)).collect(Collectors.toList());
    }
}
