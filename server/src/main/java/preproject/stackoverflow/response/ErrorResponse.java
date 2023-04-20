package preproject.stackoverflow.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import preproject.stackoverflow.exception.ExceptionCode;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ErrorResponse {
    private int status;
    private String message;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<FieldError> fieldErrors;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<ConstraintViolationError> violationErrors;

    public static ErrorResponse of(BindingResult bindingResult, ErrorMapper mapper) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        return new ErrorResponse(status.value(), status.getReasonPhrase(),
                mapper.bindingErrorToErrorResponseFieldErrors(bindingResult), null);
    }
    public static ErrorResponse of(Set<ConstraintViolation<?>> constraintViolations, ErrorMapper mapper) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        return new ErrorResponse(status.value(), status.getReasonPhrase(),
                null, mapper.constraintViolationsToConstraintViolationErrors(constraintViolations));
    }
    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage(), null, null);
    }
    public static ErrorResponse of(HttpStatus status) {
        return ErrorResponse.of(status, status.getReasonPhrase());
    }
    public static ErrorResponse of(HttpStatus status, String message) {
        return new ErrorResponse(status.value(), message, null, null);
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PACKAGE)
    public static class FieldError {
        private String field;
        private Object rejectedValue;
        private String reason;

    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PACKAGE)
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;
    }
}
