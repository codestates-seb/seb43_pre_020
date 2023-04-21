package preproject.stackoverflow.comment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import preproject.stackoverflow.comment.dto.CommentDTO;
import preproject.stackoverflow.comment.entity.Comment;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPatchDTOToComment(CommentDTO.Patch patch);
    @Mapping(source = "createdAt", target = "date")
    @Mapping(source = "comment.member.memberId", target = "memberId")
    @Mapping(source = "comment.member.displayName", target = "commenter")
    CommentDTO.Response commentToCommentResponseDTO(Comment comment);

    @Named("commentsToCommentResponseDTOs")
    List<CommentDTO.Response> commentsToCommentResponseDTOs(List<Comment> comments);
}
