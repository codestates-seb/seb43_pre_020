package preproject.stackoverflow.question.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.stackoverflow.question.dto.QuestionDTO;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.entity.QuestionVote;
import preproject.stackoverflow.question.mapper.QuestionMapper;
import preproject.stackoverflow.question.service.QuestionService;
import preproject.stackoverflow.question.service.QuestionServiceImpl;
import preproject.stackoverflow.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/questions")
@Validated
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;
    private final static String QUESTION_DEFAULT_URL = "/questions";

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<?> postQuestion(@Valid @RequestBody QuestionDTO.Post post) {
        Question question = questionService.createQuestion(mapper.questionPostDTOToQuestion(post));
        URI uri = UriCreator.createUri(QUESTION_DEFAULT_URL, question.getQuestionId());
        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity<?> patchQuestion(@Positive @PathVariable("question-id") long questionId,
                                           @Valid @RequestBody QuestionDTO.Patch questionPatchDto) {
        questionPatchDto.setQuestionId(questionId);
        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto));
        return new ResponseEntity<>(mapper.questionToQuestionResponseDTO(question), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity<?> getQuestion(@Positive @PathVariable("question-id") long questionId) {
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDTO(question), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getQuestions(@Positive @RequestParam int page, @Positive @RequestParam int size) {
        Page<Question> questionPage = questionService.findQuestions(page, size);
        List<QuestionDTO.ResponseList.SimpleResponse> simpleResponses = mapper.questionsToSimpleResponses(questionPage.getContent());
        return new ResponseEntity<>(new QuestionDTO.ResponseList(simpleResponses, questionPage), HttpStatus.OK);
    }

    @PostMapping("/{question-id}/votes")
    public ResponseEntity<?> postQuestionVotes(@Valid @RequestBody QuestionDTO.VotePost votePost,
                                               @Positive @PathVariable("question-id") long questionId) {
        votePost.setQuestionId(questionId);
        QuestionVote questionVote = mapper.questionVoteDTOToQuestionVote(votePost);
        Question question = questionService.addVoteToQuestion(questionVote);
        return new ResponseEntity<>(question.getVotes(), HttpStatus.OK);
    }

}
