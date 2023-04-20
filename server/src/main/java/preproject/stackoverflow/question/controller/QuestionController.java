package preproject.stackoverflow.question.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import preproject.stackoverflow.question.dto.QuestionDto;
import preproject.stackoverflow.question.mapper.QuestionMapper;
import preproject.stackoverflow.question.service.QuestionService;

import java.net.URI;

import static preproject.stackoverflow.utils.Constant.DEFAULT_QUESTION_URI;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
    }


    @PostMapping
    public ResponseEntity postQuestion(@RequestBody QuestionDto.Post postDto) {

        questionService.createQuestion(questionMapper.memberPostDTOToMember(postDto));
        URI uri = UriComponentsBuilder.newInstance().build(DEFAULT_QUESTION_URI);
        return ResponseEntity.created(uri).build();
    }

    // Todo : PatchQuestion

    // Todo : getQuestion

    // Todo : getQuestions

    // Todo : deleteQuestion
}
