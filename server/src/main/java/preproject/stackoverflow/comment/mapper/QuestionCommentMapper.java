package preproject.stackoverflow.comment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.comment.dto.CommentDTO;
import preproject.stackoverflow.comment.entity.Comment;

@Mapper(componentModel = "spring")
public interface QuestionCommentMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "questionId", target = "question.questionId")
    Comment commentPostDTOToComment(CommentDTO.QuestionPost post);
    Comment commentPatchDTOToComment(CommentDTO.Patch patch);
    CommentDTO.Response commentToCommentResponseDTO(Comment comment);

}
