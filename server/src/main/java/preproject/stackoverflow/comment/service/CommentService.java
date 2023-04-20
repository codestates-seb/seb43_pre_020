package preproject.stackoverflow.comment.service;

import preproject.stackoverflow.comment.entity.Comment;

public interface CommentService {
    Comment createComment(Comment comment);

    Comment updateComment(Comment comment);

    void deleteComment(Long commentId);
}
