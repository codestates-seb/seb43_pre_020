package preproject.stackoverflow.question.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import preproject.stackoverflow.question.dto.QuestionDTO;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.mapper.QuestionMapper;
import preproject.stackoverflow.question.service.QuestionService;
import preproject.stackoverflow.utils.UriCreator;

import javax.validation.Valid;
import java.net.URI;

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
        Question question = questionService.createQuestion(mapper.memberPostDTOToMember(post));
        URI uri = UriCreator.createUri(QUESTION_DEFAULT_URL, question.getQuestionId());
        return ResponseEntity.created(uri).build();
    }
}
