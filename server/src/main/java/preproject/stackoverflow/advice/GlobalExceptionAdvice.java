package preproject.stackoverflow.advice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.response.ErrorMapper;
import preproject.stackoverflow.response.ErrorResponse;

import javax.validation.ConstraintViolationException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {
    private final ErrorMapper mapper;

    public GlobalExceptionAdvice(ErrorMapper mapper) {
        this.mapper = mapper;
    }

    @ExceptionHandler
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ErrorResponse response = ErrorResponse.of(e.getBindingResult(), mapper);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @ExceptionHandler
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e) {
        ErrorResponse response = ErrorResponse.of(e.getConstraintViolations(), mapper);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @ExceptionHandler
    public ResponseEntity<?> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        HttpStatus status = HttpStatus.METHOD_NOT_ALLOWED;
        ErrorResponse response = ErrorResponse.of(status);
        log.info("HttpRequestMethodNotSupportedException : {}", response);
        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler
    public ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ErrorResponse response = ErrorResponse.of(status, e.getMostSpecificCause().toString());
        log.info("HttpMessageNotReadableException : {}", response);
        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler
    public ResponseEntity<?> handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ErrorResponse response = ErrorResponse.of(status, e.getMessage());
        log.info("MissingServletRequestParameterException : {}", response);
        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler
    public ResponseEntity<?> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ErrorResponse response = ErrorResponse.of(status, e.getCause().toString());
        log.info("MethodArgumentTypeMismatchException : {}", response);
        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler
    public ResponseEntity<?> handleBusinessLogicException(BusinessLogicException e) {
        ErrorResponse response = ErrorResponse.of(e.getExceptionCode());
        log.info("BusinessLogicException : {}", response);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }
    @ExceptionHandler
    public ResponseEntity<?> handleAccessDeniedException(AccessDeniedException e) {
        throw e;
    }

    @ExceptionHandler
    public ResponseEntity<?> handleException(Exception e) {
        log.error("# handle Exception", e);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ErrorResponse response = ErrorResponse.of(status);
        return new ResponseEntity<>(response, status);
    }
}
