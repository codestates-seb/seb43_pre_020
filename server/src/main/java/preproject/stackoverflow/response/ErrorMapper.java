package preproject.stackoverflow.response;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.validation.ConstraintViolation;
import javax.validation.Path;
import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface ErrorMapper {
    @Mapping(source = "defaultMessage", target = "reason")
    ErrorResponse.FieldError fieldErrorToErrorResponseFieldError(FieldError fieldError);
    List<ErrorResponse.FieldError> fieldErrorsToErrorResponseFieldErrors(List<FieldError> fieldErrors);
    default List<ErrorResponse.FieldError> bindingErrorToErrorResponseFieldErrors(BindingResult bindingResult) {
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        return fieldErrorsToErrorResponseFieldErrors(fieldErrors);
    }

    @Mapping(source = "invalidValue", target = "rejectedValue")
    @Mapping(source = "message", target = "reason")
    @Mapping(target = "propertyPath", qualifiedByName = "pathToString")
    ErrorResponse.ConstraintViolationError constraintViolationToConstraintViolationError(
            ConstraintViolation<?> constraintViolation);
    List<ErrorResponse.ConstraintViolationError> constraintViolationsToConstraintViolationErrors(
            Set<ConstraintViolation<?>> constraintViolations);

    @Named("pathToString")
    default String pathToString(Path path) {
        return path.toString();
    }
}
