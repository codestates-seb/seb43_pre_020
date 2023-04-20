package preproject.stackoverflow.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    MEMBER_EXISTS(409, "Member exists");
//    QUESTION_NOT_FOUNDE(404, "존재하지 않는 질문입니다."),
//    DELETED_QUESTION(406, "삭제된 질문입니다."),
//    ANSWERD_QUESTION(406, "답변 완료된 질문입니다.");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
