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
        // TODO: 댓글 수정 로직을 구현하세요.
        /*
        Hint : 1. 댓글을 가져온 후, 댓글이 null이 아닌지 확인하는 메서드를 작성합니다.
        (memberServiceImpl 클래스의 findVerifiedMember() 메서드를 참조하세요)
        2. 댓글을 가져온 후, 댓글의 body를 수정하세요 (Spring Data JPA에 해당 코드가 있을것입니다. 찾기 어렵다면 질문 주세요)
        3. 댓글을 save 하고, 반환합니다.
         */

        Comment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getBody())
                .ifPresent(body-> findComment.setBody(body));

        return  commentRepository.save(findComment);

    }

    @Override
    public void deleteComment(Long commentId) {
        // TODO: 댓글 삭제 로직을 구현하세요.
        /*
        Hint : 1. 위에서 만들었던 댓글이 null이 아닌지 확인하는 메서드를 사용해서 댓글을 가져옵니다.
        commentRepository의 delete 메서드로 댓글을 삭제합니다.
         */
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
