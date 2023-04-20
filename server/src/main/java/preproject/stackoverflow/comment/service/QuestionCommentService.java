package preproject.stackoverflow.comment.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.comment.repository.CommentRepository;
import preproject.stackoverflow.member.service.MemberService;

@Service
@Qualifier("questionCommentService")
@Transactional
public class QuestionCommentService extends CommentServiceImpl {

    public QuestionCommentService(CommentRepository commentRepository, MemberService memberService) {
        super(commentRepository, memberService);
    }
    @Override
    public Comment createComment(Comment comment) {
        verifyComment(comment);
        return getCommentRepository().save(comment);
    }

    /**
     * 댓글 등록 요청 데이터에 포함된 memberId와 questionId가 유효한지 검증하는 메서드입니다
     * questionId 검증로직은 질문 등록 기능이 구현된 후에 구현할 예정입니다.
     * @param comment
     */
    private void verifyComment(Comment comment) {
        Long memberId = comment.getMember().getMemberId();
        getMemberService().findVerifiedMember(memberId);
    }
}
