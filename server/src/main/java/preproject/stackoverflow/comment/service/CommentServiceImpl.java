package preproject.stackoverflow.comment.service;

import lombok.Getter;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.comment.repository.CommentRepository;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.service.MemberService;

import java.util.Optional;

@Getter
public abstract class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final MemberService memberService;

    public CommentServiceImpl(CommentRepository commentRepository, MemberService memberService) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
    }

    @Override
    public Comment updateComment(Comment comment) {

        Comment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getBody())
                .ifPresent(body-> findComment.setBody(body));

        return  commentRepository.save(findComment);

    }

    @Override
    public void deleteComment(Long commentId) {
          Comment comment = findVerifiedComment(commentId);
          commentRepository.delete(comment);
    }

    public Comment findVerifiedComment(long commentId){
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }
}
