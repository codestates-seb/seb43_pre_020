package preproject.stackoverflow.answer.dto;

import lombok.Getter;
import lombok.Setter;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class AnswerPostDto {

    private String body;

    private long memberId;

    private long questionId;

}
