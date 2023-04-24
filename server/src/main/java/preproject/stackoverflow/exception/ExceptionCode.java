package preproject.stackoverflow.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    MEMBER_EXISTS(409, "Member Exists"),
    QUESTION_NOT_FOUND(404, "Question Not Found"),
    ANSWER_NOT_FOUND(404, "Answer Not Found"),
    COMMENT_NOT_FOUND(404, "Comment Not Found"),
    QUESTION_CANNOT_UPDATE(403, "Already Answered Question"),
    ANSWER_CANNOT_ADOPT(403, "Answer Already Adopted"),
    QUESTION_REQUEST_NOT_VALID(400, "Question Request Not Valid");
    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
