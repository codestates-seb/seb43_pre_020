package preproject.stackoverflow.comment.controller;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.stackoverflow.comment.dto.CommentDTO;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.comment.mapper.AnswerCommentMapper;
import preproject.stackoverflow.comment.service.CommentService;
import preproject.stackoverflow.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/questions/{question-id}/answers/{answer-id}/comments")
@Validated
public class AnswerCommentController {
    private final CommentService commentService;
    private final AnswerCommentMapper mapper;
    private final static String ANSWER_COMMENT_DEFAULT_URL = "/questions/{question-id}/answers/{answer-id}/comments";

    public AnswerCommentController(@Qualifier("answerCommentService") CommentService commentService,
                                   AnswerCommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<?> postComment(@Valid @RequestBody CommentDTO.AnswerPost post,
                                         @Positive @PathVariable("answer-id") long answerId) {
        post.setAnswerId(answerId);
        Comment comment = commentService.createComment(mapper.commentPostDTOToComment(post));
        URI uri = UriCreator.createUri(ANSWER_COMMENT_DEFAULT_URL, comment.getCommentId());
        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@Positive @PathVariable("comment-id") long commentId,
                                       @Valid CommentDTO.Patch patch){
        patch.setCommentId(commentId);
        Comment comment = commentService.updateComment(mapper.commentPatchDTOToComment(patch));
        return new ResponseEntity<>(mapper.commentToCommentResponseDTO(comment), HttpStatus.OK);
    }
}
