package preproject.stackoverflow.comment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.comment.dto.CommentDTO;
import preproject.stackoverflow.comment.entity.Comment;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerCommentMapper extends CommentMapper{
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "answerId", target = "answer.answerId")
    Comment commentPostDTOToComment(CommentDTO.AnswerPost post);
}
