package preproject.stackoverflow.comment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.stackoverflow.comment.dto.CommentDTO;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.comment.mapper.QuestionCommentMapper;
import preproject.stackoverflow.comment.service.CommentService;
import preproject.stackoverflow.comment.service.QuestionCommentService;
import preproject.stackoverflow.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/questions/{question-id}/comments")
@Validated
public class QuestionCommentController {
    private final CommentService commentService;
    private final QuestionCommentMapper mapper;
    private final static String QUESTION_COMMENT_DEFAULT_URL = "/questions/{question-id}/comments";


    /*
    Comment 리소스의 경우 2개의 컨트롤러와 2개의 서비스가 있습니다.
    다형성과 추상화를 고려하여 2개의 서비스 클래스는 하나의 인터페이스의 구현체가 되도록 했습니다.
    DI(의존관계 주입)을 할때는 인터페이스 타입으로 하는게 좋은데요, 같은 타입의 빈이 2개(2개의 서비스 클래스)가 있으면 충돌이 발생합니다.
    @Qualifier 애너테이션을 사용하면 이를 해결할 수 있습니다.
    @Qualifier는 같은 타입의 빈을 구분할 수 있게 하는 역할을 합니다.
    */
    public QuestionCommentController(@Qualifier("questionCommentService") CommentService commentService,
                                     QuestionCommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<?> postComment(@Valid @RequestBody CommentDTO.QuestionPost post,
                                         @Positive @PathVariable("question-id") long questionId) {
        post.setQuestionId(questionId);
        Comment comment = commentService.createComment(mapper.commentPostDTOToComment(post));
        URI uri = UriCreator.createUri(QUESTION_COMMENT_DEFAULT_URL, comment.getCommentId());
        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity<?> patchComment(@Positive @PathVariable("comment-id") long commentId,
                                          @Valid  CommentDTO.Patch patch) {
        // TODO: 질문에 달린 댓글을 수정하는 핸들러 메서드를 구현하세요
        /* DTO 클래스와 mapper 클래스는 이미 구현되어 있습니다.
        1. DTO 클래스에 commentId를 주입힙니다.
        2. mapper 클래스를 이용해 DTO 클래스를 엔티티 클래스로 변환 후, 엔티티 클래스를 서비스 계층으로 보냅니다.
        3. 서비스 계층으로부터 반환된 엔티티 클래스를 다시 mapper를 이용해서 DTO 클래스로 변환합니다.
        4. DTO 클래스를 ResponseEntity에 담아 반환합니다.
        답변에 달린 댓글도 위와 유사하게 구현할 수 있습니다. 직접 구현해보세요.
         */
        patch.setCommentId(commentId); // 1.
        Comment comment = commentService.updateComment(mapper.commentPatchDTOToComment(patch)); // 2.
        return new ResponseEntity<>(mapper.commentToCommentResponseDTO(comment), HttpStatus.OK);// 3. / 4.

    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<?> deleteComment(@Positive @PathVariable("comment-id") long commentId) {
        // TODO : 질문에 달린 댓글을 삭제하는 핸들러 메서드를 구현하세요
        /*
        1. commentId를 서비스 계층에 전달해서 삭제 로직을 실행합니다.
        2. delete의 경우 반환 데이터는 없습니다. 상태코드가 204 No Content 가 되도록 해주세요.
        답변에 달린 댓글도 위와 유사하게 구현할 수 있습니다. 직접 구현해보세요.
         */

        return null;
    }
}
