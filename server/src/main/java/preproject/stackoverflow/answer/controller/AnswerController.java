package preproject.stackoverflow.answer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.stackoverflow.answer.dto.AnswerDTO;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.answer.mapper.AnswerMapper;
import preproject.stackoverflow.answer.service.AnswerService;
import preproject.stackoverflow.answer.service.AnswerServiceImpl;
import preproject.stackoverflow.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/questions/{question-id}/answers")
@Validated
public class AnswerController {

    private final AnswerMapper mapper;
    private final AnswerService answerService;
    private final static String ANSWER_DEFAULT_URL = "/questions/{question-id}/answers";

    public AnswerController(AnswerMapper mapper, AnswerService answerService) {

        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<?> postAnswer(@Valid @RequestBody AnswerDTO.Post post,
                                        @Positive @PathVariable("question-id") long questionId) {
        post.setQuestionId(questionId);
        Answer answer = answerService.createAnswer(mapper.answerPostDtoToAnswer(post));
        URI uri = UriCreator.createUri(ANSWER_DEFAULT_URL, answer.getAnswerId());
        return ResponseEntity.created(uri).build();
    }
    @PatchMapping("/{answer-id}")
    public ResponseEntity<?> patchAnswer(@Valid @RequestBody AnswerDTO.Patch patch,
                                         @Positive @PathVariable("answer-id") long answerId){
        patch.setAnswerId(answerId);
        Answer answer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(patch));
        return new ResponseEntity<>(mapper.answerToAnswerResponseDTO(answer), HttpStatus.OK);
    }
    @DeleteMapping("/{answer-id}")
    public ResponseEntity<?> deleteAnswer(@PathVariable("answer-id") @Positive long answerId){
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
